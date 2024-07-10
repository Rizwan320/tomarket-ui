import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const PrivacyPolicy = () => {
  return (
    <MDBox py={3}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={10} lg={8}>
          <Card>
            <CardContent>
              <MDBox textAlign="center">
                <MDTypography variant="h4" fontWeight="medium" gutterBottom>
                  Privacy Policy
                </MDTypography>
              </MDBox>
              <MDBox mt={3}>
                <MDTypography variant="h5" fontWeight="medium" gutterBottom>
                  What User Data We Collect
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  We collect various types of information in connection with the services we
                  provide:
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Personal identification information (Name, email address, phone number, etc.)
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Purchase history and preferences
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Payment information
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Usage data and analytics
                </MDTypography>

                <MDTypography variant="h5" fontWeight="medium" gutterBottom>
                  How We Use Buyer Data
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  The data we collect is used for the following purposes:
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - To process transactions and manage your orders
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - To personalize your experience and provide customer support
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - To improve our website, services, and marketing efforts
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - To send periodic emails regarding your order or other products and services
                </MDTypography>

                <MDTypography variant="h5" fontWeight="medium" gutterBottom>
                  Security of Your Data
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  Protecting your data is a top priority for us. We implement robust security
                  measures to safeguard your personal information from unauthorized access,
                  disclosure, alteration, or destruction.
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Use of secure servers and encryption
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Regular security audits and updates
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Access controls and data integrity measures
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Buyers&apos; information and location are protected and used for enhancing
                  business purposes only
                </MDTypography>

                <MDTypography variant="h5" fontWeight="medium" gutterBottom>
                  Building Trust
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  Your trust is important to us. We are committed to maintaining the
                  confidentiality, integrity, and security of your personal information.
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Transparent data practices
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Responsiveness to privacy concerns
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Continuous improvements to our privacy program
                </MDTypography>

                <MDTypography variant="h5" fontWeight="medium" gutterBottom>
                  Links to Other Websites
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  Our website may contain links to other websites. We are not responsible for the
                  content or privacy practices of these other websites. We encourage you to read the
                  privacy policies of any linked sites.
                </MDTypography>

                <MDTypography variant="h5" fontWeight="medium" gutterBottom>
                  Changes to This Privacy Policy
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  We may update our Privacy Policy from time to time. We will notify you of any
                  changes by posting the new Privacy Policy on this page. You are advised to review
                  this Privacy Policy periodically for any changes. Changes to this Privacy Policy
                  are effective when they are posted on this page.
                </MDTypography>

                <MDTypography variant="h5" fontWeight="medium" gutterBottom>
                  Contact Us
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  If you have any questions about this Privacy Policy, please contact us at:
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Email: support@tomarket.com
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Phone: +123-456-7890
                </MDTypography>
                <MDTypography variant="body2" color="textSecondary" paragraph>
                  - Address: 123 ToMarket Street, City, Country
                </MDTypography>
              </MDBox>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
};

export default PrivacyPolicy;
