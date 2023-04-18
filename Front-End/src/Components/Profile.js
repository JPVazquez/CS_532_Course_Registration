import React, { useState } from "react";
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

function Profile() {
  const [selectedOption, setSelectedOption] = useState(null);
  const Pinfo = ["Name:", "Date of Birth:", "Gender:", "ID:"];
  const Ainfo = ["Street Address:", "City:", "State:", "Zip Code:"];
  const Cinfo = ["Home Phone:", "Cell Phone:", "Email:", "Personal Email:"];

  const Pvalues = ["John Doe", "01/01/2000", "Male", "123456"];
  const Avalues = ["1234 sdsu blvd", "San Diego", "California", "123456"];
  const Cvalues = [
    "000-000-0000",
    "000-000-0000",
    "example@gmail.com",
    "example@gmail.com",
  ];

  const renderOptionContent = () => {
    switch (selectedOption) {
      case "Personal Information":
        return <InfoCard labels={Pinfo} values={Pvalues} />;
      case "Address":
        return <InfoCard labels={Ainfo} values={Avalues} />;
      case "Contacts":
        return <InfoCard labels={Cinfo} values={Cvalues} />;
      default:
        return <InfoCard labels={Pinfo} values={Pvalues} />;
    }
  };

  const options = ["Personal Information", "Address", "Contacts"];

  return (
    <div>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" align="left">
            Profile
          </Typography>
        </Box>
        <Box display="flex">
          <Card sx={{ width: 400 }}>
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
          <Box flexGrow={1} ml={2}>
            {renderOptionContent()}
          </Box>
        </Box>
      </Container>
    </div>
  );
}

export default Profile;
