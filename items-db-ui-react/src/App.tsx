import React, {Component} from 'react';
import './App.scss';
import DataService, {ApiError} from "./services/dataService";
import Item from "./models/item";
import Login from './components/Login';
import Filter from "./models/Filter";
//import FilterSelect from "./components/FilterSelect";
//import ItemsView from './components/ItemsView';
//import ItemDetails from './components/ItemDetails'
import ItemsTable from './components/ItemsTable';

interface IState {
  items: Item[];
  //selectedItem: Item | undefined;
  filter: Filter | undefined,
  //selectedFilter: Filter | undefined;
  loggedIn: boolean;
}

class App extends Component<{}, IState> {

  private _dataService: DataService;

  public state: IState = {
    items: [],
    //selectedItem: undefined,
    filter: undefined,
    //selectedFilter: undefined,
    loggedIn: false
  }

  // this should come from db or configuration, but hard-coded for now
  private _filters: Filter[] = [
    {key: "all", title: "All Items", queryString: "orderby=className,tag"},
    {key: "valves", title: "Valves", queryString: "filter=className='valve'&orderby=tag"},
    {key: "pumps", title: "Pumps", queryString: "filter=className='pump'&orderby=tag"},
    {key: "tanks", title: "Tanks", queryString: "filter=className='tank'&orderby=tag"},
    {key: "equipment", title: "Equipment", queryString: "filter=className='pump' or className='tank'&orderby=className,tag"},
  ];


  constructor(props: any) {
    super(props);
    const _apiPort = process.env.REACT_APP_API_PORT ? process.env.REACT_APP_API_PORT : 3030;
    this._dataService = new DataService(`http://localhost:${_apiPort}/api/`);
  }

  private getItems = async(filter: Filter | undefined): Promise<Item[]> => {
    const queryStr = filter ? filter.queryString : "";
    console.log(`Filter = ${this.state.filter?.key}`);
    const result = await this._dataService.getItems(queryStr);
    let items: Item[] = [];
    let loggedIn = false;
    if(result instanceof ApiError) {
      console.log(`${result.status}: ${result.message}`);
    } else {
      items = result;
      loggedIn = true;
    }
    this.setState({items, loggedIn});
    console.log(items);
    return items;
  }

  // private setSelectedItem = (items: Item[]): Item | undefined => {
  //   let {selectedItem} = this.state;
  //   if(!items || items.length === 0)
  //     selectedItem = undefined;
  //   if (selectedItem !== undefined) {
  //     const selId = selectedItem.id;
  //     selectedItem = items.find(item => item.id === selId);
  //   }
  //   console.log(selectedItem);
  //   this.setState({selectedItem});

  //   return selectedItem;
  // }

  public async componentDidMount() {
    console.log("In ComponentDidMount");

    let loggedIn = false;
    const validTokenResult = await this._dataService.validateToken();
    if(validTokenResult instanceof ApiError) {
      console.log(`${validTokenResult.status}: ${validTokenResult.message}`);
    } else {
      loggedIn = true;
    }

    // should retrieve this from db or config file, but hard-code for now
    const filter = this._filters ? this._filters[0] : undefined;
    this.setState({loggedIn, filter});
    if(loggedIn) {
      const items = await this.getItems(filter);
      //this.setSelectedItem(items);
    }
  }

  login = async (userName: string, pwd: string) => {
  
    let loggedIn = false;
    const loginResult = await this._dataService.login(userName, pwd);
    if(loginResult instanceof ApiError) {
      console.log(`${loginResult.status}: ${loginResult.message}`);
      
    }
    else {
      console.log("Login successful");
      loggedIn = true;
    }
    this.setState({loggedIn});
    if(loggedIn) {
      const items = await this.getItems(this.state.filter);
      //this.setSelectedItem(items);
    }
  }

  onFilterChanged = async (filter: Filter | undefined) => {
    console.log(`Filter changed to ${filter?.key}`);
    this.setState({filter});
    const items = await this.getItems(filter);
    //this.setSelectedItem(items);
  }

  // onItemClick = (item: Item) => {
  //   console.log(`Selected Item: ${item.tag}`);
  //   this.setState({selectedItem: item});
  // }

  onRefresh = async() => {
    console.log("refreshing items");
    const items = await this.getItems(this.state.filter);
    //this.setSelectedItem(items);

  }

  render() {
    const {loggedIn, items, filter} = this.state;
    const title = filter ? filter.title : "Items";
    //console.log(`filter = ${filter ? filter?.title : "undefined"}`);
    return (
      <div className="App">
        <h3>Items Db</h3>
        {!loggedIn && <Login onSignin={this.login} />}
        {loggedIn && 
          <ItemsTable 
            items={items} 
            filters={this._filters} 
            selectedFilter={filter}
            onFilterChanged={this.onFilterChanged}
            onRefresh={this.onRefresh}
          />
        }
      </div>
    );
  }
}

export default App;
