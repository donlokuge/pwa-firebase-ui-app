
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import React from 'react';
import AppConfig from './config/AppConfig'
 
import { Link } from 'react-router-dom';

import MainContainer from './components/MainContainer';


class ProtectedContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerOpen: false
        }
    }

    componentDidMount() {

    }

    openCloseDrawer = () => {
        this.updateDrawerState(!this.state.drawerOpen);
    }
    updateDrawerState = (drawerOpen) => {
        this.setState({ drawerOpen: drawerOpen });
    }

    handleItemClick = (path) => {

        this.setState({
            redirectPath: path
        })

    }

    render() {

        const { logout } = this.props;


        const navLinks = [
            {
                name: "Dashboard",
                link: "/dashboard"
            },
            {
                name: "Form",
                link: "/form"
            },
        ]

        return (

            <MuiThemeProvider>
                <div>

                    <AppBar
                        title={AppConfig.NAME}
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
                        onLeftIconButtonClick={this.openCloseDrawer}
                    />
                    <Drawer
                        open={this.state.drawerOpen}
                        docked={false}
                        onRequestChange={(drawerOpen) => this.updateDrawerState(drawerOpen)}
                    >
                        {navLinks.map((item, index) => {
                            return (<MenuItem key={index} >

                                <Link to={item.link}>{item.name}</Link>

                            </MenuItem>)
                        })}

                        <Divider />
                        <MenuItem onClick={logout}>Log out</MenuItem>
                    </Drawer>

                    <MainContainer {...this.props} />
                     

                </div>
            </MuiThemeProvider>

        );
    }
}

export default ProtectedContent;