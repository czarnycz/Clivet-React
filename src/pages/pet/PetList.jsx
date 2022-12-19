import { Button, Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import React, { useEffect, useState } from "react"
import AuthenticationService from "../../services/authentication.service";
import { useNavigate } from "react-router-dom";

const PetList = () => {

    const [rows, setRows] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        AuthenticationService.getById().then((response) => {
            setRows(response.data)
        })
    }, [])

    return (
        <div className="background">
            <div className="p-3 custom-card">

                <Table >
                <Button onClick={() => navigate('/addPet')}>Add Pet</Button>
                    <TableHead>
                        <TableRow>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Weight</th>
                            <th>Appointments</th>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            rows.map(
                                row =>
                                    <tr key={row.id}>
                                        <td>{row.name}</td>
                                        <td>{row.name}</td>
                                        <td>{row.age}</td>
                                        <td>{row.weight}</td>
                                        <td>
                                            <Button onClick={() => navigate(`/pets/${row.id}/appointments`)}>Details</Button>
                                        </td>
                                    </tr>
                            )
                        }
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
export { PetList }