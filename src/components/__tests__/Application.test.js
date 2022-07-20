import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText, queryByText, queryByAltText } from "@testing-library/react";
import { getByText } from "@testing-library/react"

import Application from "components/Application";

afterEach(cleanup);

describe("Application", () => {
  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));

    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render (<Application/>);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment")

    const appointment = appointments[0]

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(container, "Saving...")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument()
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container, debug } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment")

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    // 3. Click the "Delete" button on the booked appointment.

    fireEvent.click(queryByAltText(appointment, "Delete"));
    // 4. Check that the element with the text "Are you sure you would like to delete" is displayed
    expect(getByText(container, /are you sure you would like to delete/i)).toBeInTheDocument();
    // 5. Click the "Confirm" button
    fireEvent.click(getByText(appointment, "Confirm"));
    // 6. Check that the element with the text "Deleting" is displayed
    expect(getByText(appointment, "Deleting...")).toBeInTheDocument();

    // 7. Check that the element with the "Add" button is displayed
    await waitForElement(() => getByAltText(appointment, "Add"))
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining"
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, /2 spots remaining/i)).toBeInTheDocument()

    // debug()
    // console.log(prettyDOM(appointment))
  });

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the application
    const { container, debug } = render(<Application />);

    // 2. Wait until the text "Archie Cohen" is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment")

    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    // 3. Click on the "Edit" button
    fireEvent.click(queryByAltText(appointment, "Edit"));

    // 4. Change the name in the input field and select a different interviewer
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
          target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Tori Malcolm"));

    // 5. Click on the "save" button 
    fireEvent.click(getByText(appointment, "Save"));

    // 6. Check that the element with the text "saving" is displayed
    expect(getByText(container, "Saving...")).toBeInTheDocument();

    // 7. Check that the form with the new interview information is displayed
    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"))
    await waitForElement(() => getByText(appointment, "Tori Malcolm"));

    // 8. Check that the day has the same number of spots remaining
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    expect(getByText(day, /1 spot remaining/i)).toBeInTheDocument()
       
    // debug()
  })

  it("shows the save error when failing to save an appointment", async() => {
// same process to create a new appt...
    axios.put.mockRejectedValueOnce();
    const { container, debug } = render (<Application/>);

    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointments = getAllByTestId(container, "appointment")

    const appointment = appointments[0]

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });

    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(container, "Saving...")).toBeInTheDocument();
// until here when the error screen will now pop up
    
    await waitForElement(() => getByText(container, "Could not save appointment."));
    
    // click on the x
    fireEvent.click(getByAltText(container, "Close"))
    // expect to see the form empty
    expect(getByPlaceholderText(appointment, /enter student name/i)).toHaveValue("")
    // debug()

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
        // 1. Render the Application.
        const { container, debug } = render(<Application />);
  
        // 2. Wait until the text "Archie Cohen" is displayed.
        await waitForElement(() => getByText(container, "Archie Cohen"));
    
        const appointments = getAllByTestId(container, "appointment")
    
        const appointment = getAllByTestId(container, "appointment").find(
          appointment => queryByText(appointment, "Archie Cohen")
        );
      
        // 3. Click the "Delete" button on the booked appointment.
    
        fireEvent.click(queryByAltText(appointment, "Delete"));
        // 4. Check that the element with the text "Are you sure you would like to delete" is displayed
        expect(getByText(container, /are you sure you would like to delete/i)).toBeInTheDocument();
        // 5. Click the "Confirm" button
        fireEvent.click(getByText(appointment, "Confirm"));
        // 6. Check that the element with the text "Deleting" is displayed
        expect(getByText(appointment, "Deleting...")).toBeInTheDocument();
    
        // 7. Check that the error element is displayed
        await waitForElement(() => getByText(container, "Could not cancel appointment."))

        // click on the x
        fireEvent.click(getByAltText(container, "Close"))

        // expect to see the same appiointment
        expect(getByText(container, "Archie Cohen"))
        debug()
  });
});


