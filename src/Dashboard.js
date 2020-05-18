import React from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Deposits from './Deposits';
import Maps from './Maps';
import PerMillion from './PerMillion';
import ListItems from './ListItems';
import MainView from './MainView';
import FatalitiesTable from './FatalitiesTable';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Summary from './Summary';
import DoubleDays from './DoubleDays';
import MediaQuery from 'react-responsive'
import Hidden from '@material-ui/core/Hidden';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const styles = function(theme){
return {
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
  },

  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    width:350,
    marginLeft:drawerWidth
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },  
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },  
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 600,
  },
}};



class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { covid: [], countries: {}, isLoading: true, error: null, 
    componentToShow:'maps', mobileOpen:false };
    this.callback = this.callback.bind(this)
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this)
  }
  componentWillMount() {
    document.title = 'COVID-19 Argentina'
  }
  async componentDidMount() {
    try {
      let response = await fetch('https://covid.null.com.ar/');
      let data = await response.json();
      this.setState({ covid: data, isLoading: false });

      let countries = {};

      response = await fetch('https://api.covid19api.com/country/Argentina');
      data = await response.json();
      countries['argentina'] = data;

      response = await fetch('https://api.covid19api.com/country/Brazil');
      data = await response.json();
      countries['brazil'] = data;

      response = await fetch('https://api.covid19api.com/country/Bolivia');
      data = await response.json();
      countries['bolivia'] = data;

      response = await fetch('https://api.covid19api.com/country/Chile');
      data = await response.json();
      countries['chile'] = data;

      response = await fetch('https://api.covid19api.com/country/Paraguay');
      data = await response.json();
      countries['paraguay'] = data;

      response = await fetch('https://api.covid19api.com/country/Uruguay');
      data = await response.json();
      countries['uruguay'] = data;

      this.setState({countries: countries});

    } catch (error) {
      this.setState({ error: error.message, isLoading: false });
    }
  }

  callback(component) {
    this.setState({componentToShow: component});
    this.handleDrawerToggle()
  }
    
  handleDrawerToggle() {
    this.setState({mobileOpen: !this.state.mobileOpen});
  }

  render(){

    const { classes } = this.props;
    const covid = this.state.covid;


    if(covid.length === 0){
      return null;
    }



    let days = [];
    for(let day in covid['totals']){
       days.push(day);
    }

    if(covid['data']['CABA'][days[days.length - 1]] && covid['data']['CABA'][days[days.length - 1]]['total_cases'] === 0){
      for(let key in covid['data']){
        delete covid['data'][key][days[days.length - 1]];
      }
      days.pop();
    }


    const container = window !== undefined ? () => window.document.body : undefined;
    
    const drawer = (
      <div>
          <div className="drawer-top"> </div>
          <Divider />
          <List><ListItems callback={this.callback} /></List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Hidden mdUp >
              <Typography component="h1" variant="h6" color="inherit">
                COVID-19 Argentina
              </Typography>
            </Hidden>

            <Hidden smDown>
              <Typography component="h1" variant="h6" color="inherit"  className={classes.title}>
                COVID-19 Argentina
              </Typography>
              <Summary lastDay={covid['totals'][days[days.length - 1]]} day={days[days.length - 1]}/>
            </Hidden>

          </Toolbar>
        </AppBar>
        
        <nav className={classes.drawer} aria-label="mailbox folders">

        <Hidden mdUp >
          <Drawer
            container={container}
            variant="temporary"
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
     
          >
           {drawer}
          </Drawer>
        </Hidden>
       
        <Hidden smDown >
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
           {drawer}
          </Drawer>
        </Hidden>
      </nav>

       <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
           {
            this.state.componentToShow === 'maps' ?
            <Maps data={covid['data']}/>
            :
            this.state.componentToShow === 'main' ?
            <MainView covid={covid} classes={classes}/>
            :
            this.state.componentToShow === 'table' ?
            <FatalitiesTable data={covid['data']}/>
            :
            this.state.componentToShow === 'million' ?
            <PerMillion data={this.state.countries}/>
            :
            this.state.componentToShow === 'double' ?
            <DoubleDays data={covid['totals']}/>
            :
            <div />
           }


          </Container>
        </main>            
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);

            // <Box pt={4}>
            //   <Copyright />
            // </Box>
