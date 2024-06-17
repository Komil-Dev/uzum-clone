import React from 'react';
import Box from '@mui/material/Box';

const Footer = () => {
    return (
        <footer>
            <Box bgcolor={"#fff"} padding={5} display="flex" flexDirection="column" alignItems="center" width={"100%"} height={"100%"} >

                {/* Top Section: Search Input */}
                < Box display="flex" alignItems="center" width={"100%"} marginBottom={2} >

                    {/* Bottom Section: Navigation Columns */}
                    < Box display="flex" gap={"50px"} width={"60%"} paddingLeft={"20px"} >
                        {/* Navigation Column 1 */}
                        < Box width={"220px"} >
                            <h4 style={{ color: "#000" }}>Biz haqimizda</h4>
                            <ul style={{ listStyleType: 'none', padding: 0, paddingTop: "10px" }}>
                                <li><a href="/link2" style={{ color: "#8B8E99", textDecoration: 'none' }}>Topshirish punktlari</a></li>
                                <li><a href="/link3" style={{ color: "#8B8E99", textDecoration: 'none' }}>Vakansiyalar</a></li>
                            </ul>
                        </Box >

                        <Box width={"220px"}>
                            <h4 style={{ color: "#000", paddingLeft: "200px" }}>Foydalanuvchilarga</h4>
                            <ul style={{ listStyleType: 'none', paddingLeft: "200px", paddingTop: "10px" }}>
                                <li><a href="/link2" style={{ color: "#8B8E99", textDecoration: 'none' }}>Biz bilan bogʻlanish</a></li>
                                <li><a href="/link3" style={{ color: "#8B8E99", textDecoration: 'none' }}> Savol-Javob</a></li>
                            </ul>
                        </Box>

                        <Box width={"220px"}>
                            <h4 style={{ color: "#000", paddingLeft: "300px" }}>Tadbirkorlarga</h4>
                            <ul style={{ listStyleType: 'none', paddingLeft: "300px", paddingTop: "10px" }}>
                                <li><a href="/link2" style={{ color: "#8B8E99", textDecoration: 'none' }}>Uzumda soting</a></li>
                                <li><a href="/link3" style={{ color: "#8B8E99", textDecoration: 'none' }}>Sotuvchi kabinetiga kirish</a></li>
                            </ul>
                        </Box>

                        <Box width={"220px"}>
                            <h4 style={{ color: "#000", paddingLeft: "350px" }}>Ilovani yuklab olish</h4>
                            <ul style={{ listStyleType: 'none', paddingLeft: "350px" }}>
                            </ul>
                        </Box>
                    </Box >
                </Box >

                {/* Horizontal Line */}
                < hr style={{ width: '78%', borderTop: '1px solid #444', marginTop: "100px", marginRight: "270px" }} />
                {/* Social Media Icons */}
                <ul style={{ listStyleType: 'none', paddingRight: "76%", display: "flex", gap: "20px", paddingBottom: "20px", paddingTop: "20px" }}>
                    <li><a href="/link2" style={{ color: "#000", textDecoration: 'none' }}>Maxfiylik kelishuvi</a></li>
                    <li><a href="/link3" style={{ color: "#000", textDecoration: 'none' }}>Foydalanuvchi kelishuvi</a></li>
                </ul>
            </Box >
        </footer>
    );
};

export default Footer;