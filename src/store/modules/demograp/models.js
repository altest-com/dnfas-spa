import { 
    Model, 
    dateReader, 
    dateWriter, 
    timeReader, 
    timeWriter 
} from '../abstract/models';

class HourlyCountModel extends Model {
    props = {
        hours: {
            writable: false,
            api: 'hours',
            type: String,
            many: true
        },
        menCount: {
            writable: false,
            api: 'men_count',
            type: Number,
            many: true
        },
        womenCount: {
            writable: false,
            api: 'women_count',
            type: Number,
            many: true
        }
    }
}

const hourlyCountModel = new HourlyCountModel();

class DailyCountModel extends Model {
    props = {
        dates: {
            writable: false,
            api: 'dates',
            type: String,
            many: true
        },
        menCount: {
            writable: false,
            api: 'men_count',
            type: Number,
            many: true
        },
        womenCount: {
            writable: false,
            api: 'women_count',
            type: Number,
            many: true
        }
    }
}

const dailyCountModel = new DailyCountModel();

class AgeStatsModel extends Model {
    props = {
        counts: {
            writable: false,
            api: 'counts',
            type: Number,
            many: true
        },
        meanValue: {
            writable: false,
            api: 'mean_value',
            type: Number
        },
        minValue: {
            writable: false,
            api: 'min_value',
            type: Number
        },
        maxValue: {
            writable: false,
            api: 'max_value',
            type: Number
        }
    }
}

const ageStatsModel = new AgeStatsModel();

class DemograpModel extends Model {
    props = {
        ageLabels: {
            writable: false,
            api: 'age_labels',
            type: Number,
            many: true
        },
        menAges: {
            writable: false,
            api: 'men_ages',
            type: Object,
            model: ageStatsModel
        },
        womenAges: {
            writable: false,
            api: 'women_ages',
            type: Object,
            model: ageStatsModel
        },
        menCount: {
            writable: false,
            api: 'men_count',
            type: Number,
            default: 0
        },
        womenCount: {
            writable: false,
            api: 'women_count',
            type: Number,
            default: 0
        },
        hourlyCount: {
            writable: false,
            api: 'hourly_count',
            type: Object,
            model: hourlyCountModel
        },
        dailyCount: {
            writable: false,
            api: 'daily_count',
            type: Object,
            model: dailyCountModel
        }
    }
}

const demograpModel = new DemograpModel();

class DemograpFilter extends Model {
    SEX_MAN = 'man'
    SEX_WOMAN = 'woman'

    SKIN_WHITE = 'white'
    SKIN_BROWN = 'brown'
    SKIN_BLACK = 'black'

    props = {
        orderBy: {
            writable: true,
            api: 'order_by',
            type: String,
            default: '-created_at'
        },
        minTime: {
            writable: true,
            api: 'min_time',
            type: Date,
            reader: timeReader,
            writer: timeWriter
        },
        maxTime: {
            writable: true,
            api: 'max_time',
            type: Date,
            reader: timeReader,
            writer: timeWriter
        },
        minDate: {
            writable: true,
            api: 'min_date',
            type: Date,
            reader: dateReader,
            writer: dateWriter
        },
        maxDate: {
            writable: true,
            api: 'max_date',
            type: Date,
            reader: dateReader,
            writer: dateWriter
        },
        minPredAge: {
            writable: true,
            api: 'min_pred_age',
            type: Number
        },
        maxPredAge: {
            writable: true,
            api: 'max_pred_age',
            type: Number
        },
        predSex: {
            writable: true,
            api: 'pred_sex',
            type: String,
            choices: [
                '',
                this.SEX_MAN,
                this.SEX_WOMAN
            ],
            default: ''
        },
        tasks: {
            writable: true,
            api: 'tasks',
            type: Number,
            many: true
        },
        tasksTags: {
            writable: true,
            api: 'tasks_tags',
            type: Number,
            many: true
        }
    }
}

const demograpFilter = new DemograpFilter();

export {
    DemograpModel,
    demograpModel,
    DemograpFilter,
    demograpFilter    
};

