import storage from './storage';

export default {
    /**
     * Mark all jobs read
     * @return {Void}
     */
    markAllRead() {
        let jobs = [];

        storage.get('jobs', []).map((job) => {
            job.isRead = true;
            jobs.push(job);
        });

        storage.store('jobs', jobs);
    },

    /**
     * Store jobs
     * @param  {Array} jobs
     * @return {Void}
     */
    store(jobs) {
        storage.store('jobs', jobs);
    },

    /**
     * Push jobs to storage
     * @param  {Array} jobs
     * @return {Array}
     */
    push(jobs) {
        let _jobs = storage.get('jobs', []);

        // Deleting existing jobs from array
        jobs = jobs.filter((job) => {
            for(let i = 0; i < _jobs.length; ++i) {
                if(_jobs[i].recno === job.recno) {
                    return false;
                }
            }
            return true;
        });

        jobs.reverse();
        let newJobs = jobs;
        let result = storage.get('jobs', []);

        // pushing new jobs to the beginning of existing jobs array
        newJobs.map((job) => {
            job.isRead = false;
            result.unshift(job);
        });

        storage.store('jobs', result);

        return newJobs;
    },

    /**
     * Retrieve all jobs
     * @return {Array}
     */
    getAll() {
        return storage.get('jobs');
    }
}