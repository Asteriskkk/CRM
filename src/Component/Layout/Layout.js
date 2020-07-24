import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import './Layout.css'
import { withRouter,Link } from 'react-router-dom'
import AuthCheck,{Profile} from '../../util/AuthCheck'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


function SidebarItem({ depthStep = 10, depth = 0, expanded, item, ...rest }) {
    const [collapsed, setCollapsed] = React.useState(true);
    const { label, items, Icon, onClick: onClickProp } = item;
  
    function toggleCollapse() {
      setCollapsed(prevValue => !prevValue);
    }
  
    function onClick(e) {
      if (Array.isArray(items)) {
        toggleCollapse();
      }
      if (onClickProp) {
        onClickProp(e, item);
      }
    }
  
    let expandIcon;
  
    if (Array.isArray(items) && items.length) {
      expandIcon = !collapsed ? (
        <ExpandLessIcon
          className={
            "sidebar-item-expand-arrow" + " sidebar-item-expand-arrow-expanded"
          }
        />
      ) : (
        <ExpandMoreIcon className="sidebar-item-expand-arrow" />
      );
    }
  
    return (
      <>
        <ListItem
          className="sidebar-item"
          onClick={onClick}
          button
          dense
          {...rest}
        >
          <div
            style={{ paddingLeft: depth * depthStep }}
            className="sidebar-item-content"
          >
            {Icon && <Icon className="sidebar-item-icon" fontSize="small" />}
            <div className="sidebar-item-text">{label}</div>
          </div>
          {expandIcon}
        </ListItem>
        <Collapse in={!collapsed} timeout="auto" unmountOnExit>
          {Array.isArray(items) ? (
            <List disablePadding dense>
              {items.map((subItem, index) => (
                <React.Fragment key={`${subItem.name}${index}`}>
                  {subItem === "divider" ? (
                    <Divider style={{ margin: "6px 0" }} />
                  ) : (
                    <SidebarItem
                      depth={depth + 1}
                      depthStep={depthStep}
                      item={subItem}
                    />
                  )}
                </React.Fragment>
              ))}
            </List>
          ) : null}
        </Collapse>
      </>
    );
  }

function ResponsiveDrawer(props) {
    console.log(props)
    const [name, setName] = useState("")
    const [picture, setPicture] = useState("")
    useEffect(()=>{
        Profile()
        setPicture(localStorage.getItem('picture'))
        setName(localStorage.getItem('name'))
    })
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [profile , setProfile] = React.useState(true)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const initialProfile= (
  <div className="profile" onClick={()=>setProfile(!profile)}>      
  <img src={picture} style={{width:"40px",radius:"50%"}}/>
    <span >&nbsp;{name}</span>
</div>)
  const settingProfile=(     
  <div className="setting" onClick={()=>setProfile(!profile)}>      
  <img src={picture} style={{width:"40px",radius:"50%"}}/>
    <span >&nbsp;{name}</span>
    <div className="logout">
    <p onClick={handleDrawerToggle}>Setting</p>
    <Link to="/logout" ><p style={{color:'white'}}>Logout</p></Link>
    </div>
</div>)


  const drawer = (
    <div className="sidebar">
      <div className={classes.toolbar} />
      <div className="banner">      
          <img src="http://invocatory-altimete.000webhostapp.com/dist/mail.png" style={{width:"50px",radius:"50%"}}/>
      <span >&nbsp;MailReach</span>

</div>
      <List disablePadding dense>
        {props.items.map((sidebarItem, index) => (
          <React.Fragment key={`${sidebarItem.name}${index}`}>
            {sidebarItem === "divider" ? (
              <Divider style={{ margin: "6px 0" }} />
            ) : (
              <SidebarItem
                depthStep={props.depthStep}
                depth={props.depth}
                expanded={props.expanded}
                item={sidebarItem}
              />
            )}
          </React.Fragment>
        ))}
      </List>
{profile?initialProfile:settingProfile}
    </div>
  );

  const container = props.window !== undefined ? () => props.window().document.body : undefined;

  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} style={{background:'#e9ecef',borderRadius:"0.25rem"}}>
        <Toolbar>
          <IconButton
            color="black"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap style={{fontSize:"x-large",color:'black'}}>
            {AuthCheck()?'Dashboard':"Login"}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
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
        <div className={classes.toolbar} />
       {props.children}
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withRouter(ResponsiveDrawer);
