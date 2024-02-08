
class validator {
    static validateTaskInfo(taskInfo) {
        if (
            //taskInfo.hasOwnProperty("id") &&
            taskInfo.hasOwnProperty("title") &&
            taskInfo.hasOwnProperty("description") &&
            taskInfo.hasOwnProperty("completed")
            
        ) {
            return {
                "status": true,
                "message": "task has been validated"
            };
        }
        else {
            return {
                "status": false,
                "message": "task info is malformed"
            };
        }
    }
    static validateDataTypes(taskInfo) {
        if (this.isString(taskInfo.title) &&
        this.isString(taskInfo.description)
        && this.isBoolean(taskInfo.completed) &&
        this.isNotEmpty(taskInfo.title) &&
        this.isNotEmpty(taskInfo.description)){
            return {
                "status": true,
                "message": "task has been validated"
            }
        }else {
          
            return {
                "status": false,
                "message": "task info is malformed"
            };
        }
    }
    static vaildateTaskId(tasksData, userGivenTaskId) {
        const tasks = tasksData.tasks;
        let filteredtask = tasks.filter(task => task.id == userGivenTaskId);

        if (filteredtask.length > 0) {
            return {
                "status": false,
                "message": "Id already exists"
            };
        } else {
            return {
                "status": true,
                "message": "task has valid id"
            };
        }
    }
    static isString(value) {
        return typeof value === "string";
    }
    static isBoolean(value) {
        console.log(typeof value === 'boolean')
        return typeof value === 'boolean';
    }
    static isNotEmpty(value) {
        return value.length > 0;
    }
    static isNumber(value){
        return typeof value === "number";
    }
}
module.exports = validator;