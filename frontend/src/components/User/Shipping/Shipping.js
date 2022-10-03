import React, { Fragment, useEffect, useState } from "react";
import "./Shipping.css"
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../layout/MetaData";
import PinDropIcon from '@mui/icons-material/PinDrop';
import HomeIcon from '@mui/icons-material/Home';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PublicIcon from '@mui/icons-material/Public';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import {Country,State} from "country-state-city"
import { useAlert } from "react-alert";
import CheckoutStep from "../../Product/Cart/CheckoutStep.js"
import { getShippingInfo, savaShippingInfo } from "../../../redux/actions/cartAction";
import { useNavigate } from "react-router-dom";


function Shipping() {

  const dispatch = useDispatch();
  const alert = useAlert();
  const naviagte = useNavigate()


 const { shippingInfo } = useSelector((state) => state.shippingDetails);

    function returnLastElement(shippingInfo) {
        return shippingInfo && shippingInfo.at(-1);
      }
    
      const value = returnLastElement(shippingInfo);
  
    const [address, setAddress] = useState(`${value &&  value.address}`)
    const [city, setCity] = useState(value && value.city)
    const [state, setState] = useState(value && value.state)
    const [country, setCountry] = useState(value && value.country)
    const [pincode, setPincode] = useState(value && value.pincode)

  const shippingSubmit = (e) => {
    e.preventDefault();
    dispatch(savaShippingInfo({address,city,state,country,pincode}))
    naviagte('/order/confirm')
  }
 

  return (
    <Fragment>
      <MetaData title={`${'Shipping Details'} -- ${process.env.REACT_APP_SITE_NAME}`} />
      <CheckoutStep activeStep={0}/>


      <div className="shippingCantainer">
        <div className="shippingBox">
          <h2 className="shippingheading">Shipping Details</h2>
          <form className="shippingForm" encType="multipart/form-data" onSubmit={shippingSubmit}>
          
          {/* <div>
              <PublicIcon/>
              <select name="" required value={country} onChange={(e) => setCountry(e.target.value)} id="">
                <option value="">Country</option>
                {Country && Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}> {item.name} </option>
                ))}
              </select>
            </div> */}

            <div>
              <HomeIcon/>
              <input type="text" placeholder="Address" required value={address} onChange={(e)=> setAddress(e.target.value)} />
            </div>

            <div>
              <LocationCityIcon/>
              <input type="text" placeholder="City" required value={city} onChange={(e)=> setCity(e.target.value)} />
            </div>

            <div>
              <PinDropIcon/>
              <input type="number" placeholder="Pincode" required value={pincode} onChange={(e)=> setPincode(e.target.value)} />
            </div>

            <div>
              <PublicIcon/>
              <select name="" required value={country} onChange={(e) => setCountry(e.target.value)} id="">
                <option value="">Country</option>
                {Country && Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}> {item.name} </option>
                ))}
              </select>
            </div>
            {country && (
              <div>
                <TransferWithinAStationIcon/>
                <select name="" required value={state} onChange={(e)=> setState(e.target.value)} id=""> 
                <option value=""> State</option> 
                {State && State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}> 
                  {item.name}
                  </option>
                ) )}
                </select>
              </div>
            )}

            <input type="submit" value="Continue" className="shippingBtn"  disabled={state ? false : true}/>

          </form>
        </div>
      </div>

    </Fragment>
  )
}

export default Shipping
