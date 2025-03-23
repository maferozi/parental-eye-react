import { Link } from "react-router-dom";

export default function HomeMainContent({
  title,
  description,
  button1Text,
  button2Text,
  showImage = true,
  showButtons = true,
}) {
  return (
    <>
    <div className="style={{}}">
      <header
        className={`text-white text-center ${showImage ? "" : "no-image"}`}
        style={{
          display: "flex",      
          flexDirection: "column", 
          justifyContent: "flex-start", 
          height: "90vh",    
        }}
      >
        <div className="container p-5">
          <div className="row mb-0">
            <div
              className={`col-12 ${
                showImage ? "col-md-6" : "content-container"
              } mb-4 mb-md-0`}
            >
              <h1 className="display-4 text-white text-center mb-5 mt-0">
                {title}
              </h1>
              <p className="lead text-center mb-5">{description}</p>
              {showButtons && (
                <div>
                  <Link to={"/auth/register"}  className="btn btn-warning btn-lg me-3 mb-3 mb-md-0">
                    {button1Text}
                  </Link>
                  <button className="btn btn-outline-light btn-lg me-3 mb-3 mb-md-0">
                    {button2Text}
                  </button>
                </div>
              )}
            </div>

            {showImage && (
              <div className="col-12 col-md-6 d-none d-md-block">
                <img
                  src="/images/Img1.png"
                  alt="Safety Illustration"
                  className="img-fluid"
                />
              </div>
            )}
          </div>
        </div>
      </header>
      
        </div>
    </>
  );
}
