export const Company = ({ id, name, VAT, onInfoClick }) => (
    <tr>
        <td>{name}</td>
        <td>{VAT}</td>
        <td>
            <button onClick={() => onInfoClick({ id, name, VAT })}>Info</button>
        </td>
    </tr>
);
