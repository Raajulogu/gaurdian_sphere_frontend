import React, { useEffect, useState } from 'react'
import Base from '../Base/Base'
import { fetchData } from '../container/services';
import { Button, TextField } from '@mui/material';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

const Account = () => {
  let [name,setName]=useState("");
  let [dob,setDob]=useState("");
  let [city,setCity]=useState("");
  let [mobile,setMobile]=useState("");
  let [alertNumbers,setAlertNumbers]=useState([]);
  let [loading,setLoading]=useState(false)
  let token=localStorage.getItem("token");

  useEffect(()=>{
    async function getUserAccount(){
      let user=await fetchData(token);
      console.log(user);
      setName(user.user.name);
      setMobile(user.user.mobile);
      setAlertNumbers(user.user.alertNumber);
      setCity(user.user.city);
      setDob(user.user.dob);
    }
    getUserAccount()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  //Alert Number Onchange
  const handleChange = (event, newValue) => {
    setAlertNumbers(newValue);
  };

  //User Data Updating
  async function updateUser(){
    setLoading(true);
    let user={
      name,
      city,
      mobile,
      dob,
      alertNumber:alertNumbers,
    }
    let update=await updateUser(user,token);
    if(!update.message=="User Data Updated Successfully"){
      alert("Error Updating Details Please try again later")
    }
    setLoading(false);
  }
  return (
    <Base Page={"My Account"}>
      <div className="w-[100%] flex justify-center pt-[5vh]">
        <form
          onSubmit={updateUser}
          className="w-[70vw] flex flex-col justify-center"
        >
          <TextField
            name="name"
            type="name"
            label="Name"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
          <br />
          <TextField
            name="city"
            type="city"
            label="City"
            placeholder="Mention Your City"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
          />
          <br />
          <TextField
            name="mobile"
            type="mobile"
            label="Mobile"
            placeholder="Enter Contact Number"
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
          />
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Responsive variant"
                placeholder="IncidentDate"
                name="incidentDate"
                type="incidentDate"
                value={dayjs(dob?dob:"")}
                onChange={(date) => {
                  setDob({
                    target: { name: "incidentDate", value: date.format() },
                  });
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <br />
          <Autocomplete
        multiple
        freeSolo
        id="tags-outlined"
        options={[]}
        value={alertNumbers}
        onChange={handleChange}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            label="Numbers"
            placeholder="Alert Numbers"
          />
        )}
      />
        <br/>
          <div className="submit-btn">
            {loading ? (
              <Button variant="contained" type="submit">
                Updating...
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Update
              </Button>
            )}
          </div>
        </form>
      </div>
    </Base>
  )
}

export default Account