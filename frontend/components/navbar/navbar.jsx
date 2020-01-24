import React from "react";
import {Link} from "react-router-dom";

const COLORS = {
  0: "red",
  1: "blue",
  2: "white",
  3: "green",
  4: "purple",
  5: "yellow"
};

class NavBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      query: {
        searchQuery: ""
      },
      dropDown: "",
      searchBar: "",
      searchBarClosing: false,
      // scrolling: false
    };

    this.searchTimeout;
    this.handleLogOut = this.handleLogOut.bind(this);
    this.dropDropDown = this.dropDropDown.bind(this);
    this.hideDropDown = this.hideDropDown.bind(this);
    this.searchBarToggle = this.searchBarToggle.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.clearInput = this.clearInput.bind(this);
    // this.dropDownToggle = this.dropDownToggle.bind(this);
  }

  handleLogOut(e) {
    e.preventDefault();
    this.props.logout().then(() => this.props.history.push("/login"));
  }

  dropDropDown(e) {
    this.setState({ dropDown: "active" });
  }

  hideDropDown(e) {
    this.setState({ dropDown: "" });
  }

  searchBarToggle(e) {
    let searchBar = this.state.searchBar;

    if (this.state.query.searchQuery === "") {

      if (searchBar === "") { 
        this.setState({ searchBar: "active" })
      } else { 
        this.setState({searchBarClosing: true});
        setTimeout(() => {
          this.setState({ searchBar: "", searchBarClosing: false });
        }, 500);

      }
    }
  }

  handleInput(e) {
      clearTimeout(this.searchTimeout);
      
      let query = this.state.query;
      query.searchQuery = e.target.value;
      this.setState({ query });
      
      if (query.searchQuery === "") {
        this.props.history.push("/browse");
      } else {
        this.props.history.push(`/search/`);
        
//////figure out Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.
        this.searchTimeout = setTimeout(() => {
          this.props.history.push(`/search/${query.searchQuery}`);

        }, 300);
      }
  }

  clearInput(e) {
    this.props.history.push("/browse");
    let query = {searchQuery: ""};
    this.setState({query});
  }

  handleScroll(e) {
    this.setState({scrolling: true});
  }

  render() {

    const {searchBar, searchBarClosing} = this.state;
    const {searchQuery} = this.state.query;
    const closing = (searchBarClosing) ? "closing" : "";

    const inputBar = (searchBar === "active") ? (
      <input
        type="text"
        id="search-bar"
        placeholder="Titles, people, genres"
        className={closing}
        value={searchQuery}
        autoFocus={true}
        onBlur={this.searchBarToggle}
        onChange={this.handleInput} />
    ) : "";

    let queryFilled = (searchQuery === "") ? "" : "active";

    // let scroll = (scrolling) ? "active" : "";
    let browse = (this.props.history.location.pathname.includes("browse")) ? (
      <li className="current">Home</li>
    ) : (
        <Link to="/browse">
          <li className="link">Home</li>
        </Link>
    )
    let watchlist = (this.props.history.location.pathname.includes("watchlist")) ? (
      <li className="current">My List</li>
    ) : (
        <Link to="/watchlist">
          <li className="link">My List</li>
        </Link>
    )

    return (
      <header className={`browse-nav ${scroll}`} >
        <nav className="left-nav">
          <Link to="/browse">
            <img className="browse-logo" src={window.logo} alt="logo" />
          </Link>
          <ul className="nav-movie-links">
            {/* ADD LINKS LATER */}
           {browse}
           {watchlist}
          </ul>
        </nav>

        <nav className="right-nav">
          <section className={`search-field ${searchBar}`}>
            <i className="fas fa-search"
              onClick={this.searchBarToggle}
              ></i>
              {inputBar}
            {/* <input 
              type="text"
              id="search-bar"
              placeholder="Titles, people, genres"
              value={searchQuery}
              autofocus={(searchBar === "active") ? "true" : ""}
              onBlur={this.searchBarToggle}
              onChange={this.handleInput}
              /> */}
            <i className={`fas fa-times ${queryFilled}`}
              onClick={this.clearInput}></i>
          </section>


          <ul className="nav-profile-links">
            {/* ADD LINKS LATER */}
            {/* <li>KIDS</li>
            <li>DVD</li> */}
            <li className="icon"><i className="fas fa-bell"></i></li>

       
            <li className="profile"
              onMouseOver={this.dropDropDown}></li>

          </ul>

          {/* DROPDOWN MENU */}
          <aside className={`profile-drop-down ${this.state.dropDown}`}
            onMouseLeave={this.hideDropDown}>
            <section className="profile-section">
              <span>
                <Link to="/manage_profiles">Manage Profiles</Link>
              </span>
            </section>

            <ul>
              <li>Account</li>
              <li>Help Center</li>
              <li onClick={this.handleLogOut}>Sign out of Animetflix</li>
            </ul>

          </aside>
          

        </nav>
      </header>
    )
  }
}

export default NavBar;