import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import { Box, Button, CardHeader, IconButton, Typography } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../components/LineChart";
import ProgressCircle from './../components/ProgressCircle';
import { green, grey } from "@mui/material/colors";
import StatBox from './../components/StatBox';
import { mockTransactions } from "../data/mockData";
import BarChart from "../components/BarChart";
import PieChart from "../components/PieChart";

const Dashboard = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false);

  return (
    <div className="flex min-h-screen bg-fondo">
      <Sidebar sidebarToggle={sidebarToggle} />
      <div
        className={`flex flex-col flex-grow p-4 bg-fondo ${
          sidebarToggle ? "ml-64" : ""
        } mt-16`}
      >
        <Home
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}
        />
          <div className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-7xl mx-auto">

            <Box m="20px">
      {/* HEADER */}
      <Box className="flex justify-between items-center font-inter">
        <CardHeader
          title="DASHBOARD"
          subheader="Bienvenido a tu panel de control"
          sx={{ '.MuiCardHeader-title': { fontWeight: 'bold', fontSize: '1.50rem' } }}
        />
        <Box>
          <Button
          color="primary"
          sx={{
            backgroundColor: 'primary.main',
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
            borderRadius: "8px",
            padding: "10px 20px",
            '&:hover': {
              backgroundColor: 'primary.dark',
              color: "white"
            },
            '&:active': {
              backgroundColor: 'primary.light',
              color: "white"
            },
            '&:focus': {
              backgroundColor: 'primary.main',
              color: "white"
            }
          }}
        >
            <DownloadIcon sx={{ mr: "10px" }} />
            Descargar Reportes
          </Button>
        </Box>
      </Box>

      {/* CUADRÍCULAS Y GRÁFICOS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* FILA 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor='grisClaro.main'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: green[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor='grisClaro.main'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: green[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor='grisClaro.main'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: green[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor='grisClaro.main'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: green[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* FILA 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor='grisClaro.main'
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h"
                fontWeight="600"
                color={grey[900]}
              >
                Revenue Generated
              </Typography>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={green[500]}
              >
                $59,342.32
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadIcon 
                  sx={{ fontSize: "26px", color: green[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor='grisClaro.main'
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${grey[900]}`}
            color={grey[900]}
            p="15px"
          >
            <Typography color={grey[900]} variant="h" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${grey[900]}`}
              p="15px"
            >
            <Box display="flex" flexDirection="column">
              <Typography
                color={green[500]}
                variant="h"
                fontWeight="400"
              >
                {transaction.txId}
              </Typography>
              <Typography
                color={grey[900]}
                variant="h"
                fontWeight="200"
              >
                {transaction.user}
              </Typography>
            </Box>
            
              <Box color={grey[900]}
                  variant="h6"
                  fontWeight="200"
              >{transaction.date}</Box>
              <Box
                backgroundColor={green[500]}
                p="5px 10px"
                borderRadius="4px"
                variant="h6"
                fontWeight="200"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* FILA 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor='grisClaro.main'
          p="30px"
        >
          <Typography variant="h" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h"
              color={green[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography variant="h">Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor='grisClaro.main'
          pt="30px"
        >
          <Typography
            variant="h"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor='grisClaro.main'
          padding="30px"
        >
          <Typography
            variant="h"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Pie Chart
          </Typography>
          <Box height="200px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>

            </div>
          </div>
       </div>
    </div>
  );
};

export default Dashboard;
