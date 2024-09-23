import axios from "axios";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";
import { Pagination, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { RiRadioButtonLine } from "react-icons/ri";
import { useSelector } from "react-redux";
function AllClients() {
  const translate = useSelector((state) => state.language.translation);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]);
  // const [clientNumbers, setClientNumbers] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [open2, setOpen2] = useState(false);

  useEffect(() => {
    const fetchClientAccounts = async () => {
      const req = await axios(
        `http://localhost:5000/api/v1/admin/allclients?keyword=${keyword}&category=${status}&page=${page}`
      );
      console.log(req.data);
      setClients(req.data.clientAccounts);
      // setClientNumbers(req.data.clientsNumbers);
      setTotal(req.data.countDocuments);
      setTotalPages(req.data.totalPages);
    };
    fetchClientAccounts();
  }, [page, keyword, status]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = (client) => {
    setSelectedClient(client);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedClient(null);
  };

  async function handleDelete(email) {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to remove this account?\n${email}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    });
    if (!confirmed.isConfirmed) {
      return;
    }
    try {
      await axios.delete(
        `http://localhost:5000/api/v1/admin/deleteclient/${encodeURIComponent(
          email
        )}`
      );

      const filteredClients = clients.filter(
        (client) => client.email !== email
      );
      setClients(filteredClients);
      setTotal((prev) => prev - 1);
      // setClientNumbers(filteredClients.length);

      Swal.fire("Deleted!", "The account has been removed.", "success");
    } catch (error) {
      await Swal.fire(
        "Error!",
        "There was an issue removing the client account.",
        "error"
      );
    }
  }
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    setKeyword(searchTerm.trim());
    console.log("Searching for:", searchTerm);
  };
  const handleChange2 = (event) => {
    setStatus(event.target.value);
    setPage(1);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };

  return (
    <section id="client-files" className="mb-8">
      <h2 className="text-3xl font-semibold text-gray-700 mb-4 w-full text-center ">
        {translate.Client_Accounts}
      </h2>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-xl text-center border-b mb-7 pb-2">
          {translate.Number_of_Clients}: {total}
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
                <MenuItem value={true}>{translate.Confirmed}</MenuItem>
                <MenuItem value={false}>{translate.Not_Confirmed}</MenuItem>
              </Select>
            </FormControl>
          </div>
          {/* search */}
          <div className="relative w-full max-w-xs ml-auto">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-300"
            />
            <div className="absolute top-0 right-0 h-full flex items-center pr-3">
              <SearchIcon
                className="!text-gray-400 hover:!text-gray-700 !transition-all !duration-200 focus:outline-none cursor-pointer"
                onClick={handleSearch}
              />
            </div>
          </div>
        </div>
        {clients.map((client) => (
          <div
            key={client.email}
            className="flex justify-between items-center mb-4"
          >
            <div>
              <p className="text-gray-800">
                {translate.Name}: {client.fullName}{" "}
                <RiRadioButtonLine
                  className={`inline-block text-sm text-${
                    client.isConfirm ? "green-400" : "black"
                  }`}
                />
              </p>
              <p className="text-gray-600">{translate.Email}: {client.email}</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => handleOpen(client)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                {translate.View}
              </button>
              <button
                onClick={() => handleDelete(client.email)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                {translate.Delete}
              </button>
            </div>
          </div>
        ))}
        <Stack spacing={2}>
          <Pagination
            color="primary"
            count={totalPages}
            page={page}
            onChange={handleChange}
            sx={{ margin: "0 auto", display: "flex", justifyContent: "center" }}
          />
        </Stack>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {selectedClient ? (
            <>
              <Typography id="modal-modal-title" variant="h5" component="h2">
                {translate.Name}: {selectedClient.fullName}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {translate.Email}: {selectedClient.email}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {translate.Address}:{selectedClient.address}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {translate.Phone}:{selectedClient.phone}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {translate.IsConfirm}: {JSON.stringify(selectedClient.isConfirm)}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {translate.Balance}:{selectedClient.balance}
              </Typography>
            </>
          ) : (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {translate.No_client_selected}.
            </Typography>
          )}
        </Box>
      </Modal>
    </section>
  );
}

export default AllClients;
