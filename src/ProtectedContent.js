
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';

import React from 'react';
import AppConfig from './config/AppConfig'

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

    render() {
        const Container = this.props.protectedContentContainer;

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
                        <MenuItem>Menu Item</MenuItem>
                        <MenuItem>Menu Item 2</MenuItem>
                        <Divider />
                        <MenuItem>Log out</MenuItem>
                    </Drawer>

                    
                </div>
            </MuiThemeProvider>

        );
    }
}

export default ProtectedContent;