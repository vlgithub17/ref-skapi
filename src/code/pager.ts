export default class Pager {
    sortBy: string;
    id: string;
    order: 'asc' | 'desc' = 'asc';
    map: any[] = [];
    list: { [key: string]: any } = {};
    resultsPerPage = 10;
    worker: any;
    endOfList: boolean;

    constructor(
        worker: Worker,
        options: {
            id: string; // unique id of the data
            sortBy?: string; // sort by which key
            order?: 'asc' | 'desc'; // sort order
            resultsPerPage?: number; // how many items per page
        }
    ) {
        let { id, sortBy, order = 'asc', resultsPerPage = 10 } = options;
        if (!id || typeof id !== 'string') {
            throw 'id is required';
        }
        this.worker = worker;
        this.id = id;
        this.sortBy = sortBy || id;
        this.order = order;
        this.resultsPerPage = resultsPerPage;
    }

    getPage(page: number): {
        list: Object[];
        maxPage: number;
    } {
        let startIndex = (page - 1) * this.resultsPerPage;
        let result = this.map.slice(startIndex, startIndex + this.resultsPerPage);

        return {
            list: result.map((target: string) => this.list[target.split('􏿿')[1]]),
            maxPage: Math.ceil(this.map.length / this.resultsPerPage)
        };
    }

    insertItems(
        items: { [key: string]: any }[],
        options?: {
            withinRange: boolean;
        }
    ): Promise<"Insert Successful"> {
        let { withinRange = false } = options || {};

        console.log({
            method: 'insert',
            list: this.list,
            map: this.map,
            id: this.id,
            sortBy: this.sortBy,
            order: this.order,
            items: items,
            withinRange: withinRange
        })
        this.worker.postMessage({
            method: 'insert',
            list: this.list,
            map: this.map,
            id: this.id,
            sortBy: this.sortBy,
            order: this.order,
            items: items,
            withinRange: withinRange
        });

        for (let item of items) {
            this.list[item[this.id]] = item;
        }

        return new Promise((res) => {
            this.worker.onmessage = (event: any) => {
                this.map = event.data;
                res("Insert Successful");
            };
        });
    }

    editItem(
        item: { [key: string]: any },
        options?: {
            withinRange: boolean;
        }
    ): Promise<"Edit Saved"> {
        let { withinRange = false } = options || {};

        this.worker.postMessage({
            method: 'edit',
            list: this.list,
            map: this.map,
            id: this.id,
            sortBy: this.sortBy,
            order: this.order,
            items: [item],
            withinRange: withinRange
        });

        return new Promise((res) => {
            this.worker.onmessage = (event: any) => {
                if (event.data) {
                    this.map = event.data;
                }

                Object.assign(this.list[item[this.id]], item);
                res("Edit Saved");
            };
        });
    }

    deleteItem(id: string): Promise<"Item Deleted"> {
        this.worker.postMessage({
            method: 'delete',
            list: this.list,
            map: this.map,
            id: this.id,
            sortBy: this.sortBy,
            order: this.order,
            items: [this.list[id]]
        });

        return new Promise((res) => {
            this.worker.onmessage = (event: any) => {
                this.map = event.data;

                delete this.list[id];
                res("Item Deleted");
            };
        });
    }

    ////////////////////////////////////////////////////////////////
    static async init(option: {
        id: string; // unique id of the data
        sortBy?: string; // sort by which key
        order?: 'asc' | 'desc'; // sort order
        resultsPerPage?: number; // how many items per page
    }): Promise<Pager> {
        const worker = new Worker(
            new URL('@/code/pager_worker.js', import.meta.url),
            { type: 'module' }
        );

        return new Pager(worker, option);
    }
}