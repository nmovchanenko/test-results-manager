export class Spec {

    /**
     * @param {Object} spec
     */
    constructor(spec) {
        Object.entries(spec).forEach(([key, value]) => {
            this[key] = value;
        });
    }
}

export class Execution {
    /**
     * @param {Object} execution
     */
    constructor(execution) {
        Object.entries(execution).forEach(([key, value]) => {
            this[key] = value;
        });
    }
}

export class Result {
    /**
     * @param {Object} result
     */
    constructor(result) {
        Object.entries(result).forEach(([key, value]) => {
            this[key] = value;
        });
        this.isSelected = false;
    }
}

export class ResultError {
    /**
     * @param {Object} error
     */
    constructor(error) {
        Object.entries(error).forEach(([key, value]) => {
            this[key] = value;
        });
    }
}

export class Assumption {
    constructor(assumption) {
        Object.entries(assumption).forEach(([key, value]) => {
            this[key] = value;
        });
    }
}

export class Issue {
    constructor(issue) {
        Object.entries(issue).forEach(([key, value]) => {
            this[key] = value;
        });
    }
}