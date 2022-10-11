import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import logo from "../../../images/logo-E-buy.png";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
import AddIcon from "@mui/icons-material/Add";
import { useSelector } from "react-redux";
// import { TreeView, TreeItem } from "@mui/lab";

function Sidebar() {

  const {user} = useSelector((state) => state.user);

  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="E-Buy" />
      </Link>

      <Link to="/admin/dashboard" className={user&&user.power === 'Hero' ? "heroClass" : "userClass" }>
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link to="">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              {" "}
              {/* to='/admin/products'  */}
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              {" "}
              {/* to='/admin/product */}
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Category">
            <Link to="/admin/categories">
              {" "}
              {/* to='/admin/products'  */}
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/category">
              {" "}
              {/* to='/admin/product */}
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders"  className={user&&user.power === 'Hero' ? "heroClass" : "userClass" }>
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>
      <Link to="/admin/users" className={user&&user.power === 'Hero' ? "heroClass" : "userClass" }>
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
    </div>
  );
}

export default Sidebar;
