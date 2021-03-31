import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import WidgetsIcon from '@material-ui/icons/Widgets';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import './AdminPanel.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const drawerWidth = 240;
const useStyles1 = makeStyles({
  table: {
    minWidth: 650,
  },
});
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

function AdminPanel(props) {
  const { window } = props;
  const classes = useStyles();
  const classes1 = useStyles1();
  const theme = useTheme();
  const { register, handleSubmit, errors } = useForm();
  const [imageURL, setIMageURL] = useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [currentOperation,setCurrentOperation]=useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
    
  };
const handleClick=(index)=>{
    if(index===1)
    {
        document.getElementById('show-all-product-for-editing').style.display='none';
        document.getElementById('product-adding-form').style.display='block';
        setCurrentOperation(true);
    }
    else if(index===2){
        document.getElementById('show-all-product-for-editing').style.display='block';
        document.getElementById('product-adding-form').style.display='none';
        setCurrentOperation(false);
    }
    else{
        document.getElementById('show-all-product-for-editing').style.display='block';
        document.getElementById('product-adding-form').style.display='none';
        
    }
}
  const drawer = (
    <div>
   <Link to="/"><h3 style={{color:'goldenrod'}}>FreshGrocery</h3></Link>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['ManageProduct', 'Add Product', 'Edit Product'].map((text, index) => (
          <ListItem button key={text} onClick={()=>handleClick(index)}>
            <ListItemIcon>{index===0?<WidgetsIcon/>:index===2?<CreateIcon/>:<AddIcon/>}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  const [allProducts,setAllProducts]=useState([]);
  useEffect(()=>{
      fetch('http://localhost:8080/products')
      .then(res=>res.json())
      .then(data=>setAllProducts(data))
  },[])
  const productDelete=(id)=>{
      console.log('This product will be deleted: ',id);
      fetch(`http://localhost:8080/deletesingleproduct/${id}`,{
          method: 'DELETE'
      })
      .then(res=>res.json())
      .then(result=>{
          if(result){
            alert('Product Deleted Successfully');
            document.location.reload(result);
          }
      })

  }
  const onSubmit = data => {
    const productData={...data};
    productData.imageURL=imageURL;
    console.log(productData);
    const url='http://localhost:8080/addProduct';
    fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(productData)
    })
    .then(res=>res.json())
    .then(data=>{
        if(data){
            alert('Product Added Succesfully');
            document.getElementById('product-name').value="";
            document.getElementById('product-weight').value="";
            document.getElementById('product-price').value="";
            document.getElementById('product-image').value="";
            document.location.reload(data);
        }
    })
};
  const handleImageUpload=event=>{
    console.log(event.target.files[0]);
    const imageData=new FormData();
    imageData.set('key','df37e18a03602906e48312132d91183f');
    imageData.append('image',event.target.files[0]);
    axios.post('https://api.imgbb.com/1/upload', imageData)
    .then(function (response) {
        console.log(response.data.data.display_url);
      setIMageURL(response.data.data.display_url);
    })
    .catch(function (error) {
      console.log(error);
    });
    }
  return (
    <div id="main-body" className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
          </IconButton>
          <Typography variant="h6" noWrap>{currentOperation?"Add Product":"Manage Product"}</Typography>
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
        <div id="show-all-product-for-editing">
        <TableContainer component={Paper}>
      <Table className={classes1.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Action</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {allProducts.map((product) => (
            <TableRow key={product._id} id="product-row">
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell align="right">{product.weight}</TableCell>
              <TableCell align="right">{product.price}</TableCell>
              <TableCell align="right"><CreateIcon color="default" style={{cursor:'pointer'}}/><DeleteIcon color="secondary" style={{cursor:'pointer'}} onClick={()=>{productDelete(product._id)}}/></TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

        </div>

        <form onSubmit={handleSubmit(onSubmit)} id="product-adding-form">
        <div className="row d-flex justify-content-between m-5">
        <div className="col-md-6">
        <label htmlFor="">Product Name</label>
        <input id='product-name' name="name" placeholder="Product Name" defaultValue="" ref={register}/>
        </div>
        <div className="col-md-6">
        <label htmlFor="">Weight</label><br/>
        <input id='product-weight' name="weight" placeholder="Product Weight" defaultValue="" ref={register}/>
        </div>
        </div>
        <div className="row d-flex justify-content-around m-5">
        <div className="col-md-6">
        <label htmlFor="">Product Price</label><br/>
        <input id='product-price' defaultValue="" placeholder="Product Price" name="price" ref={register}/>
        </div>
        <div className="col-md-6">
        <label htmlFor="">Add Photo</label> <br/>
        <input id='product-image' type="file"  name="exampleRequired" onChange={handleImageUpload}/>
        </div>
        </div>
        <input className="save-button" type="submit" value="Save"/>
        </form>
      </main>
    </div>
  );
}

AdminPanel.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default AdminPanel;