import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Divider,
} from "@mui/material";
import { ServiceStatusDetail } from "../../types";
import { getServiceDisruptions } from "../../utils/serviceStatus";

interface ServiceStatusContentProps {
  service: ServiceStatusDetail;
}

const ServiceStatusContent: React.FC<ServiceStatusContentProps> = ({
  service,
}) => {
  const disruptions = getServiceDisruptions(service);
  const hasDisruptions = disruptions.length > 0;

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Accordion
        expanded={hasDisruptions}
        sx={{
          width: "100%",
          bgcolor: hasDisruptions ? "error.light" : "success.light",
        }}
      >
        <AccordionSummary aria-controls="panel3bh-content" id="panel3bh-header">
          <Typography
            sx={{ fontWeight: 'bold' }}
          >
            {hasDisruptions
              ? "Service currently suffering disruptions"
              : "No service disruptions"}
          </Typography>
        </AccordionSummary>
        {hasDisruptions && (
          <>
            <Divider />
            {disruptions.map((disruption, item) => (
            <AccordionDetails sx={{ bgcolor: "error.light" }} key={item}>
                <>
                  <Typography>
                    {disruption.statusSeverityDescription}. Severity:{" "}
                    {disruption.statusSeverity}
                  </Typography>
                </>
              
            </AccordionDetails>
            ))}
          </>
        )}
      </Accordion>
    </Box>
  );
};

export default ServiceStatusContent;
