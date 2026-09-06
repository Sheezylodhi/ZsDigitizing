export default function EmailSignature() {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: "20px",
      }}
    >
      <table
        cellPadding="0"
        cellSpacing="0"
        style={{
          borderCollapse: "collapse",
          borderSpacing: "0",
        }}
      >
        <tbody>
          <tr>
            {/* LOGO SECTION */}
            <td
              style={{
                verticalAlign: "middle",
                paddingRight: "24px",
              }}
            >
              <div
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "50%",
                  border: "2px solid #0e2c1c",
                  backgroundColor: "#060f23",
                  display: "block",
                  overflow: "hidden",
                  textAlign: "center",
                  lineHeight: "90px",
                }}
              >
                <img
                  src="https://www.zsdigitizing.com/ZS_Signature.jpeg"
                  alt="ZS Digitizing Logo"
                  width="90"
                  height="90"
                  style={{
                    display: "block",
                    width: "90px",
                    height: "90px",
                    border: "none",
                  }}
                />
              </div>
            </td>

            {/* DIVIDER */}
            <td
              style={{
                width: "1px",
                backgroundColor: "#d8e2dc",
                padding: 0,
              }}
            />

            {/* TEXT SECTION */}
            <td
              style={{
                verticalAlign: "middle",
                paddingLeft: "24px",
              }}
            >
              {/* NAME */}
              <h2
                style={{
                  margin: "0",
                  fontSize: "20px",
                  fontWeight: "700",
                  color: "#0e2c1c",
                  lineHeight: "24px",
                }}
              >
                ZS Digitizing
              </h2>

              {/* POSITION */}
              <p
                style={{
                  margin: "2px 0 8px 0",
                  fontSize: "13px",
                  color: "#0e2c1c",
                  fontWeight: "600",
                }}
              >
                ZS Sales Team
              </p>

              {/* CONTACT INFORMATION */}
              <table
                cellPadding="0"
                cellSpacing="0"
                style={{
                  borderCollapse: "collapse",
                  margin: "0 0 8px 0",
                }}
              >
                <tbody>
                  {/* WEBSITE + PHONE */}
                   {/* EMAIL */}
                  <tr>
                    <td
                      style={{
                        width: "22px",
                        paddingBottom: "4px",
                        fontSize: "13px",
                        color: "#0e2c1c",
                      }}
                    >
                      ✉
                    </td>

                    <td
                      colSpan={3}
                      style={{
                        paddingBottom: "4px",
                      }}
                    >
                      <a
                        href="mailto:info@zsdigitizing.com"
                        style={{
                          fontSize: "13px",
                          color: "#334155",
                          textDecoration: "none",
                        }}
                      >
                        info@zsdigitizing.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    {/* WEBSITE ICON */}
                    <td
                      style={{
                        width: "22px",
                        paddingBottom: "4px",
                        fontSize: "13px",
                      }}
                    >
                      🌐
                    </td>

                    {/* WEBSITE */}
                    <td
                      style={{
                        paddingBottom: "4px",
                        paddingRight: "18px",
                      }}
                    >
                      <a
                        href="https://www.zsdigitizing.com/"
                        style={{
                          fontSize: "13px",
                          color: "#334155",
                          textDecoration: "none",
                        }}
                      >
                        zsdigitizing.com
                      </a>
                    </td>

                    {/* PHONE ICON */}
                    <td
                      style={{
                        width: "22px",
                        paddingBottom: "4px",
                        fontSize: "13px",
                      }}
                    >
                      📞
                    </td>

                    {/* PHONE NUMBER */}
                    <td
                      style={{
                        paddingBottom: "4px",
                      }}
                    >
                      <a
                        href="tel:+1-727-761-7877"
                        style={{
                          fontSize: "13px",
                          color: "#334155",
                          textDecoration: "none",
                        }}
                      >
                        +1-727-761-7877
                      </a>
                    </td>
                  </tr>

                 

                  {/* LOCATION */}
                  <tr>
                    <td
                      style={{
                        width: "22px",
                        verticalAlign: "top",
                        fontSize: "13px",
                        color: "#0e2c1c",
                      }}
                    >
                      📍
                    </td>

                    <td
                      colSpan={3}
                      style={{
                        fontSize: "13px",
                        color: "#334155",
                        lineHeight: "17px",
                      }}
                    >
                      7901 4th St N, St. Petersburg, FL 33702
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* SOCIAL ICONS */}
              <table
                cellPadding="0"
                cellSpacing="0"
                style={{
                  borderCollapse: "collapse",
                  marginTop: "4px",
                }}
              >
                <tbody>
                  <tr>
                    {/* FACEBOOK */}
                    <td style={{ paddingRight: "8px" }}>
                      <a
                        href="https://www.facebook.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          width: "26px",
                          height: "26px",
                          lineHeight: "26px",
                          textAlign: "center",
                          backgroundColor: "#0e2c1c",
                          color: "#ffffff",
                          borderRadius: "50%",
                          fontSize: "14px",
                          fontWeight: "700",
                          textDecoration: "none",
                        }}
                      >
                        f
                      </a>
                    </td>

                    {/* INSTAGRAM */}
                    <td>
                      <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "inline-block",
                          width: "26px",
                          height: "26px",
                          lineHeight: "26px",
                          textAlign: "center",
                          backgroundColor: "#0e2c1c",
                          color: "#ffffff",
                          borderRadius: "50%",
                          fontSize: "14px",
                          fontWeight: "700",
                          textDecoration: "none",
                        }}
                      >
                            <img src="https://i.postimg.cc/PrXjwW1H/zs-circle-logo.png"></img>
                      </a>

                    </td>
                  </tr>
                </tbody>
              </table>

              {/* SERVICES */}
              <p
                style={{
                  margin: "9px 0 0 0",
                  fontSize: "12px",
                  fontStyle: "bold",
                  color: "#000000",
                }}
              >
                Embroidery Digitizing · Vector Artwork · Custom Patches
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}