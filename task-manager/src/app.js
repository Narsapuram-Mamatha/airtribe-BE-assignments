const express = require('express');
const fs = require('fs');
const tasksData = require('./task.json');
const Validator = require('./helpers/validator');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.status(200).send("Task Manager Assignment")
});

app.get('/api/tasks', (req, res) => {
    if (tasksData.tasks.length > 0) {
        return res.status(200).json(tasksData);
    }
    return res.status(500).json("No tasks data found");
});

app.get('/api/tasks/:taskId', (req, res) => {
    const tasks = tasksData.tasks;
    const taskId = req.params.taskId;
    let filteredTask = tasks.filter(task => task.id == taskId);
    if (filteredTask.length == 0) {
        return res.status(404).send("No appropriate task found");
    }
    return res.status(200).send(filteredTask);
});

app.post('/api/tasks', (req, res) => {
    const userProvidedDetails = req.body;

    if (Validator.validateTaskInfo(userProvidedDetails).status == true) {
        if (Validator.vaildateTaskId(tasksData, userProvidedDetails.id).status === true) {
            let dataModified = tasksData;
            dataModified.tasks.push(userProvidedDetails);
            fs.writeFile('./task.json', JSON.stringify(dataModified),
                { encoding: 'utf8', flag: 'w' }, (err, data) => {
                    if (err) {
                        return res.status(500).send("Something went wrong while writing the task please recreate the task");
                    } else {
                        return res.status(201).send("Task has been successfully validated and created");
                    }

                });
        } else {
            return res.status(400).send(Validator.vaildateTaskId(tasksData, userProvidedDetails.id));
        }
    } else {
        return res.status(400).send(Validator.validateTaskInfo(userProvidedDetails));
    }
});

app.put('/api/tasks', (req, res) => {
    const userProvidedDetails = req.body;
    if (Validator.validateTaskInfo(userProvidedDetails).status  === true) {
        if (Validator.vaildateTaskId(tasksData, userProvidedDetails.id).status === false) {
            let dataModified = tasksData;
            const indexofTask = dataModified.tasks.findIndex(obj => obj.id === userProvidedDetails.id);
            let taskToChange = dataModified.tasks[indexofTask];
            if (taskToChange) {
                taskToChange.title = userProvidedDetails.title;
                taskToChange.description = userProvidedDetails.description;
                taskToChange.completed = userProvidedDetails.completed;
            }

            fs.writeFile('./task.json', JSON.stringify(dataModified),
                { encoding: 'utf8', flag: 'w' }, (err, data) => {
                    if (err) {
                        return res.status(500).send("Something went wrong while writing the task please recreate the task");
                    } else {
                        return res.status(201).send("Task has been successfully validated and updated");
                    }

                });
        } else {
            return res.status(400).send("Task id does not exist");
        }
    } else {
        return res.status(400).send("Data malformed");
    }

});

app.delete('/api/tasks/:taskId', (req, res) => {
    let dataModified = tasksData;
    const taskId = req.params.taskId;
    
    const indexofTask = dataModified.tasks.findIndex(obj => obj.id == taskId);

    if (indexofTask < 0) {
        return res.status(404).send("No appropriate task found");
    } else {
        dataModified.tasks.splice(indexofTask,1);
        fs.writeFile('./task.json', JSON.stringify(dataModified),
            { encoding: 'utf8', flag: 'w' }, (err, data) => { });
            return res.status(204).send("task has been deleted successfully");

    }

});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;