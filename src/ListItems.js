import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

class ListItems extends React.Component {

  render(){
    return(
      <div>
        <ListItem button onClick={() => this.props.callback('maps')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Mapas" />
        </ListItem>
        <ListItem button onClick={() => this.props.callback('main')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Casos por dia" />
        </ListItem>
        <ListItem button onClick={() => this.props.callback('table')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Datos por Provincia" />
        </ListItem>
        <ListItem button onClick={() => this.props.callback('million')}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Datos por Millon" />
        </ListItem>

      </div>  
    );
  }
  
};

export default ListItems;