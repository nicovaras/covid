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
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
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
    componentToShow:'maps' };
    this.callback = this.callback.bind(this)
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

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="absolute" className={clsx(classes.appBar, classes.appBarShift)}>
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              className={clsx(classes.menuButton, classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
              COVID-19 Argentina
            </Typography>
            <Summary lastDay={covid['totals'][days[days.length - 1]]} day={days[days.length - 1]}/>

          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper),
          }}
          open={true}
        >
          <div className="drawer-top">
          </div>
          <Divider />
          <List><ListItems callback={this.callback} /></List>
        </Drawer>



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