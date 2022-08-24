import Task from "../models/Task.js";
import Section from "../models/Section.js";

export const create = async (req, res) => {
    const {sectionId} = req.body
    try {
        const section = await Section.findById(sectionId)
        const tasksCount = await Task.find({section: sectionId}).count()
        const task = await Task.create({
            section: sectionId,
            position: tasksCount > 0 ? tasksCount : 0
        })
        task._doc.section = section
        console.log("----- task------> ", task)
        res.status(201).json(task)

    } catch (err) {

        res.status(500).json(err)
    }
}

export const update = async (req, res) => {
    const {taskId} = req.params

    try {
        const task = await Task.findByIdAndUpdate(
            taskId,
            {$set: req.body}
        )
        res.status(200).json(task)
    } catch (err) {
        res.status(500).json(err)
    }
}


export const taskDelete = async (req, res) => {
    const {taskId} = req.params

    try {
        const currentTask = await Task.findById(taskId)
        await Task.deleteOne({_id: taskId})
        const tasks = await Task.find({section: currentTask.section}).sort("position")

        for (const key in tasks) {
            await Task.findByIdAndUpdate(
                tasks[key].id,
                {$set: {position: key}}
            )
        }

        res.status(200).json("deleted")
    } catch (err) {
        res.status(500).json(err)
    }
}

export const updatePosition = async (req, res) => {
    const {
        resourceList,
        destinationList,
        resourceSectionId,
        destinationSectionId,
    } = req.body

    const resourceListReverse = resourceList.reverse()
    const destinationListReverse = destinationList.reverse()


    try {
        if (resourceSectionId !== destinationSectionId) {
            for (const key in resourceListReverse) {
                await Task.findByIdAndUpdate(
                    resourceSectionId,
                    {
                        $set: {
                            section: resourceSectionId,
                            position: key
                        }
                    }
                )
            }
        }


        for (const key in destinationListReverse) {
            await Task.findByIdAndUpdate(
                destinationListReverse[key].id,
                {
                    section: destinationSectionId,
                    position: key
                }
            )
        }


        res.status(200).json("update")
    } catch (err) {
        res.status(500).json(err)
    }
}








