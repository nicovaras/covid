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
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

class ListItems extends React.Component {

  render(){
    return(
      <div>
        <ListItem button onClick={() => this.props.callback('maps')}>
          <ListItemIcon>
            <ArrowForwardIosIcon />
          </ListItemIcon>
          <ListItemText primary="Casos Confirmados" />
        </ListItem>
        <ListItem button onClick={() => this.props.callback('main')}>
          <ListItemIcon>
            <ArrowForwardIosIcon />
          </ListItemIcon>
          <ListItemText primary="Comparar" />
        </ListItem>
        <ListItem button onClick={() => this.props.callback('table')}>
          <ListItemIcon>
            <ArrowForwardIosIcon />
          </ListItemIcon>
          <ListItemText primary="Vision General" />
        </ListItem>
        <ListItem button onClick={() => this.props.callback('million')}>
          <ListItemIcon>
            <ArrowForwardIosIcon />
          </ListItemIcon>
          <ListItemText primary="Datos por Millon" />
        </ListItem>

      </div>  
    );
  }
  
};

export default ListItems;