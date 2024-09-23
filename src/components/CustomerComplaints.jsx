import EmailIcon from "@mui/icons-material/Email";
<<<<<<< Updated upstream
import { Button } from "@mui/material";

function CustomerComplaints() {
=======
import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { RiRadioButtonLine } from "react-icons/ri";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import AdminLoader from "./adminLoader";
import { Box } from "@mui/system";
import Modal from "react-responsive-modal";
import { useSelector } from "react-redux";
function CustomerComplaints() {
  const [clients, setClients] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [status, setStatus] = useState("");
  const [open2, setOpen2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
    const translate = useSelector((state) => state.language.translation);

  useEffect(() => {
    const fetchClientAccounts = async () => {
      const req = await axios(
        `http://localhost:5000/api/v1/fur/problems/getComplaints?category=${status}&page=${page}`
      );
      console.log(req.data);
      setClients(req.data.complaints);
      setTotal(req.data.complaintsNumbers);
      setTotalPages(req.data.totalPages);
    };
    fetchClientAccounts();
  }, [page, status]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleChange2 = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleOpen = (client) => {
    setSelectedClient(client);
    console.log("client", client);
    setOpen(true);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

>>>>>>> Stashed changes
  const handleReply = (email) => {
    window.location.href = `mailto:${email}?subject=Response to Your Complaint&body=Dear Customer,`;
  };
  const complaints = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      complaint: "There was an issue with my last order.",
    },
    {
      id: 2,
      name: "Mark Wilson",
      email: "mark.wilson@example.com",
      complaint: "The product I received was damaged.",
    },
    {
      id: 3,
      name: "Eva Green",
      email: "eva.green@example.com",
      complaint: "I haven't received my refund yet.",
    },
  ];
  return (
<<<<<<< Updated upstream
    <section id="customer-complaints" className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4 w-full text-center ">
        Customer Complaints
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        {complaints.map((complaint) => (
=======
    <section id="client-files" className="mb-8">
      <h2 className="text-3xl font-semibold text-gray-700 mb-4 w-full text-center ">
        {translate.Client_Complaints}
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-xl text-center border-b mb-7 pb-2">
          {translate.Number_of_Complaints}: {total}
        </p>
        <div className="flex items-center mt-4">
          {/* select */}
          <div className=" !mb-5">
            <FormControl sx={{ m: 1, minWidth: 140 }}>
              <InputLabel id="demo-controlled-open-select-label">
                {translate.Status}
              </InputLabel>
              <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                open={open2}
                onClose={handleClose2}
                onOpen={handleOpen2}
                value={status}
                label="Status"
                onChange={handleChange2}
              >
                <MenuItem value="">
                  <em>{translate.None}</em>
                </MenuItem>
                <MenuItem value={"pending"}>{translate.Pending}</MenuItem>
                <MenuItem value={"solved"}>{translate.Solved}</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {clients.map((client) => (
>>>>>>> Stashed changes
          <div
            key={complaint.id}
            className="flex justify-between items-center mb-4"
          >
            <div>
<<<<<<< Updated upstream
              <p className="text-gray-800 font-bold">{complaint.name}</p>
              <p className="text-gray-600">Complaint: {complaint.complaint}</p>
              <p className="text-gray-600">Email: {complaint.email}</p>
=======
              <p className="text-gray-800">
                {translate.Name}: {client.userName}{" "}
                <RiRadioButtonLine
                  className={`inline-block text-sm text-${
                    client.problemState === "solved" ? "green-400" : "black"
                  }`}
                />
              </p>
              <p className="text-gray-600">Email: {client.userEmail}</p>
              <Button
                onClick={() => handleOpen(client)}
                className="text-gray-600"
              >
                {translate.Massage}
              </Button>
            </div>
            <div className="flex space-x-4">
              <Button
                startIcon={<CheckCircleOutlineIcon />}
                onClick={() => makeItDone(client)}
                className={`rounded-lg ${
                  client.problemState === "pending" ? "hover:bg-blue-600 " : ""
                }`}
                sx={{
                  background:
                    client.problemState === "solved" ? "#2dc301" : "#3b82f6",
                  color: "white",
                  padding: "10px 14px",
                  cursor:
                    client.problemState === "solved"
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {translate.done}
              </Button>
              {client.problemState === "pending" && (
                <Button
                  startIcon={<EmailIcon />}
                  onClick={() => handleReply(client.userEmail)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  sx={{
                    background: "#3b82f6",
                    color: "white",
                    padding: "10px 14px",
                  }}
                >
                  {translate.Reply_via_Email}
                </Button>
              )}
>>>>>>> Stashed changes
            </div>
            <Button
              startIcon={<EmailIcon />}
              onClick={() => handleReply(complaint.email)}
              sx={{
                background: "#3b82f6",
                padding: "10px 10px",
                color: "white",
                ":hover": { background: "#2563eb", transition: "all 0.3s" },
              }}
            >
              {/* te xt-white px-4 py-2 rounded-lg hover:bg-blue-600" */}
              Reply via Email
            </Button>
          </div>
        ))}
      </div>
<<<<<<< Updated upstream
=======

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        styles={{
          modal: { width: "80%", maxWidth: "600px", minHeight: "600px" },
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            height: "80%",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedClient ? (
            <>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                {translate.Name}: {selectedClient.userName}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span className="font-semibold"> {translate.Email}:</span>{" "}
                {selectedClient.userEmail}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <span className="font-semibold"> {translate.Phone}:</span>{" "}
                {selectedClient.userMobile}
              </Typography>

              <Box
                component="div"
                id="modal-modal-description"
                sx={{
                  mt: 2,
                  minHeight: "50%",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                <span className="font-semibold"> {translate.Massage}:</span>
                {selectedClient.userProblem}
              </Box>
            </>
          ) : (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {translate.No_client_selected}
            </Typography>
          )}
        </Box>
      </Modal>
>>>>>>> Stashed changes
    </section>
  );
}

export default CustomerComplaints;
