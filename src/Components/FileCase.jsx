import React, { useState } from "react";
import Base from "../Base/Base";
import * as yup from "yup";
import { useFormik } from "formik";
import { fileCase } from "../container/services";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

//Validation Schema
let fieldValidationSchema = yup.object({
  mobile: yup.string().required("Please Give Mobile Number"),
  details: yup.string().required("Please Give Details"),
  incidentSpot: yup.string().required("Please Mention IncidentSpot"),
  incidentDate: yup.string().required("Please Mention IncidentDate"),
});

const FileCase = () => {
  let [loading, setLoading] = useState(false);
  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  //Formik Actions
  let { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      mobile: "",
      details: "",
      incidentDate: "",
      incidentSpot: "",
    },
    validationSchema: fieldValidationSchema,
    onSubmit: (data) => {
      FileACase(data);
    },
  });

  //Filing Case
  async function FileACase(data) {
    setLoading(true);
    await fileCase(data, token);
    setLoading(false);
    navigate("/your-post");
  }
  return (
    <Base Page={"File a Case"}>
      <div className="w-[100%] flex justify-center pt-[5vh]">
        <form
          onSubmit={handleSubmit}
          className="w-[70vw] flex flex-col justify-center"
        >
          <TextField
            name="incidentSpot"
            type="incidentSpot"
            label="IncidentSpot"
            placeholder="Mention IncidentSpot"
            value={values.incidentSpot}
            onChange={handleChange}
          />
          {errors.incidentSpot ? (
            <div style={{ color: "crimson" }}>{errors.incidentSpot}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            multiline
            rows={4}
            name="details"
            type="details"
            label="Details"
            placeholder="Mention Incident Detailly"
            value={values.details}
            onChange={handleChange}
          />
          {errors.details ? (
            <div style={{ color: "crimson" }}>{errors.details}</div>
          ) : (
            ""
          )}
          <br />
          <TextField
            name="mobile"
            type="mobile"
            label="Mobile"
            placeholder="Enter Contact Number"
            value={values.mobile}
            onChange={handleChange}
          />
          {errors.mobile ? (
            <div style={{ color: "crimson" }}>{errors.mobile}</div>
          ) : (
            ""
          )}
          <br />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Responsive variant"
                placeholder="IncidentDate"
                name="incidentDate"
                type="incidentDate"
                value={dayjs(values.incidentDate)}
                onChange={(date) => {
                  handleChange({
                    target: { name: "incidentDate", value: date.format() },
                  });
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
          {errors.incidentDate ? (
            <div style={{ color: "crimson" }}>{errors.incidentDate}</div>
          ) : (
            ""
          )}
          <br />
          <div className="submit-btn">
            {loading ? (
              <Button variant="contained" type="submit">
                Uploading...
              </Button>
            ) : (
              <Button variant="contained" type="submit">
                Upload
              </Button>
            )}
          </div>
        </form>
      </div>
    </Base>
  );
};

export default FileCase;
