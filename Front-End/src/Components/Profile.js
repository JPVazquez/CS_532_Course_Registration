import React, { useState, useEffect } from "react";
import {
  Typography,
  Container,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import InfoCard from "./InfoCard";
import Cookies from "js-cookie";
import PdfTable from "./PDF";

function Profile() {
  const [selectedOption, setSelectedOption] = useState(null);
  // label for the card
  const Pinfo = [
    "ID:",
    "Name:",
    "Date of Birth:",
    "Address:",
    "Phone Number:",
    "Major:",
    "Minor:",
  ];
  const Cinfo = ["Courses:"];

  // format for the pdf generator
  const formatTestData = (data) => {
    return [
      { label: "ID:", value: data.ID },
      { label: "Name:", value: data.Name },
      { label: "Date Of Birth:", value: data.DateOfBirth },
      { label: "Address:", value: data.Address },
      { label: "Phone Number:", value: data.PhoneNumber },
      { label: "Major:", value: data.Major },
      { label: "Minor:", value: data.Minor },
    ];
  };
  const [cValues, setCvalues] = useState({});
  const [pValues, setPvalues] = useState({});
  const [pdfData, setPDF] = useState({});
  const sessionId = Cookies.get("session_id");
  const studentId = Cookies.get("user_id");

  useEffect(() => {
    const fetchStudentData = async () => {
      const session_key = Cookies.get("session_key");
      const response = await fetch("http://127.0.0.1:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reportName: "studentInfo",
          studentId: parseInt(studentId),
          sessionId: sessionId,
        }),
      });

      if (response.status === 401) {
        console.log("Authentication Failed.");
      } else if (response.status === 200) {
        console.log("Successful query.");
        const data = await response.json();
        // data passed for the pdf generator
        const updatedPDF = {
          ID: data.id.toString(),
          Name: data.name,
          DateOfBirth: data.dateOfBirth,
          Address: data.address,
          PhoneNumber: data.phoneNumber,
          Major: data.major,
          Minor: data.minor,
        };

        // data passed for the card
        const updatedPvalues = [
          data.id,
          data.name,
          data.dateOfBirth,
          data.address,
          data.phoneNumber,
          data.major,
          data.minor,
        ];
        const updatedCvalues = [data.courses];
        setPvalues(updatedPvalues);
        setCvalues(updatedCvalues);
        setPDF(updatedPDF);
      }
    };

    fetchStudentData();
  }, []);

  // Right Column Contents
  const options = ["Personal Information", "Academics"];

  const renderOptionContent = () => {
    switch (selectedOption) {
      case "Personal Information":
        return <InfoCard labels={Pinfo} values={pValues} />;
      case "Academics":
        return <InfoCard labels={Cinfo} values={cValues} />;
      default:
        return <InfoCard labels={Pinfo} values={pValues} />;
    }
  };

  return (
    <div>
      <Container maxWidth="lg">
        {/* Title */}
        <Box sx={{ ml: 2, mt: 4, mb: 4 }}>
          <Typography color="grey" variant="h5" align="left">
            Profile
          </Typography>
        </Box>
        <Box display="flex">
          {/* Left Column */}
          <Card sx={{ width: "40%", height: "80%" }}>
            <CardContent>
              <List>
                {options.map((option, index) => (
                  <div key={index}>
                    <ListItem onClick={() => setSelectedOption(option)}>
                      <ListItemText primary={option} />
                    </ListItem>
                    {index !== options.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
            </CardContent>
          </Card>
          {/* Right Column */}
          <Box flexGrow={1} display="flex" flexDirection="column">
            <Box flexGrow={1} ml={2}>
              {renderOptionContent()}
            </Box>
            <PdfTable data={pdfData} formatData={formatTestData} />
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Profile;
