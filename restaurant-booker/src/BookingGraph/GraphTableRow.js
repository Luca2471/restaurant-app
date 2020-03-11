import React from "react";

function GraphTableRow({ bookingSlots, tables, displayDate }) {
  // const [filteredTablesByDate, setFilteredTablesByDate] = useState([]);

  // useEffect(() => {
  //   let tablesFiltered = tables.filter(({ bookings }) => {
  //     const dates = bookings.map(booking => booking.date);
  //     return dates.includes(displayDate);
  //   });
  //   setFilteredTablesByDate(tablesFiltered);
  // }, [displayDate, tables]);

  const createTD = tables.map(table => {
    // const tablesFilteredByBookingDate = table.bookings.filter(({ date }) => {
    //   return date === displayDate;
    // });
    // console.table(tablesFilteredByBookingDate);
    // console.log("log of tables filtered " + tablesFilteredByBookingDate[0]);
    // console.log(tables);

    return (
      <tr>
        <td>Table number: {table.id}</td>

        {bookingSlots.map(bookingSlot => {
          if (table.bookings.length === 0) {
            return <td>No Bookings for this time</td>;
          } else {
            let findTable = table.bookings.find(({ time, date }) => {
              return (
                bookingSlot >= time &&
                bookingSlot <= getEndTime(time) &&
                date === displayDate
              );
            });
            if (findTable) {
              let findCustomer = findTable.customer
                ? findTable.customer.name
                : "";
              return (
                <td className="entry">
                  <a href="">
                    {" "}
                    Customer: {findCustomer} <br /> People:{" "}
                    {findTable.numberOfPeople}
                  </a>
                </td>
              );
            } else {
              return <td>No Bookings for this time</td>;
            }
          }
        })}
      </tr>
    );
  });

  function getEndTime(timeString, duration = 1) {
    let timeIncreasedInt = parseInt(timeString.split(":")[0]) + duration;
    let timeIncreasedInString = `${timeIncreasedInt}:00`;
    return timeIncreasedInString;
  }

  if (!tables) {
    return null;
  } else {
    return <>{createTD}</>;
  }
}

export default GraphTableRow;
