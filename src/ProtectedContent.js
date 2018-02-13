
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';

import React from 'react';
import AppConfig from './config/AppConfig'

import { Link } from 'react-router-dom';

import MainContainer from './components/MainContainer';

import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox'; 
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import ContentSend from 'material-ui/svg-icons/content/send';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';

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
                            return (<MenuItem key={index}
                                containerElement={<Link to={item.link} />}
                                primaryText={item.name}
                                leftIcon={<FontIcon className="material-icons">settings</FontIcon>
                                }
                            />

                            )
                        })}

                        <Divider />

                        <List>
                            <Subheader>Nested List Items</Subheader>
                            <ListItem primaryText="Sent mail" leftIcon={<ContentSend />} />
                            <ListItem primaryText="Drafts" leftIcon={<ContentDrafts />} />
                            <ListItem
                                primaryText="Inbox"
                                leftIcon={<ContentInbox />}
                                initiallyOpen={true}
                                primaryTogglesNestedList={true}
                                nestedItems={[
                                    <ListItem
                                        key={1}
                                        primaryText="Starred"
                                        leftIcon={<ActionGrade />}
                                    />]}
                            />



                        </List>

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