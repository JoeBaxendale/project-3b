# Manual Tests

These are manual tests to check the functionalities of the Gantt chart component
(`SvelteGanttReact`) work as expected. They were done due to difficulties finding bars in the chart
through automated tests and also due to the difficulty of mocking drag events.

1. The field engineer chart displays the names of the engineers.

   1. Click on 'Field Engineer' button.
   2. Check the left column displays only the engineers' names.

2. Tennis court chart displays the tennis court names.

   1. Click on 'Tennis Court' button.
   2. Check the left column displays only tennis court names.

3. User can drag and add an overtime bar for 16/03/2021 11:00 to the field engineer Gantt chart.

   1. Click on 'Field Engineer' button.
   2. Overtime bar is next to schedule bar above the actual Gantt chart.
   3. [If current date is not 16/03/2021] Click the left arrow button till 16/03/2021 is reached.
   4. Click on overtime bar and drag to 11:00 onto the Gantt chart for Field Engineer A.
   5. A blue overtime bar is displayed on the chart for Field Engineer A.

4. User can drag and add a tournament bar for 16/03/2021 12:00 to the tennis court Gantt chart.

   1. Click on 'Tennis Court' button.
   2. Tournament bar is next to not available bar above the actual Gantt chart.
   3. [If current date is not 16/03/2021] Click the left arrow button till 16/03/2021 is reached.
   4. Click on tournament bar and drag to 12:00 on the Gantt chart for Tennis Court E.
   5. A blue tournament bar is displayed on the chart for Tennis Court E.

5. Time changes to a bar in the JSON are displayed on the Gantt chart.

   1. Click on a Gantt chart type.
   2. Ensure a purple 'Edit JSON' button is below the Gantt chart.
   3. Click on the 'Edit JSON' button.
   4. Find `227,101,Scheduled Shift,Tue Mar 16 2021 02:30:00 GMT+0000,Tue Mar 16 2021 05:30:00 GMT+0000,green`.
   5. Change the start time from 02:30:00 to 03:00:00
   6. Click 'View Changes'.
   7. Start time of scheduled shift bar on Tuesday 16 March now shows 02:40:32 (for Field Engineer
      B).
