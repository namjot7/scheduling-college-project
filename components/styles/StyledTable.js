import styled from "styled-components";

export const StyledTable = styled.table`
    width: 100%;
    /* border-collapse: collapse; */
    margin-top: 20px;

    th, td {
        white-space: nowrap;
        border: 1px solid white;
        width: auto;
        padding: 5px;
    }

    th {
        font-weight: bold;
        width: auto;
        text-align: left;
    }
`;