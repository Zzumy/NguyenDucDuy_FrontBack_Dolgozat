import DataService from "../../models/dataService.js";
import Error from "../../models/error.js";
import TableView from "../../views/admin/tableView.js";
import FormView from "../../views/admin/formView.js";
import AdminModel from "../../models/admin/adminModel.js";

export default class AdminController {
    constructor() {
        this.parent = $("#list");
        this.dataService = new DataService();

        this.setupEventListeners();

        this.dataService.alldata(
            ["http://localhost:5500/api/bejegyzesek", "../../models/regex.json"],
            this.display.bind(this),
            this.error.bind(this)
        );

        this.dataService.getData(
            "../../models/regex.json",
            this.inputDisplay.bind(this),
            this.error.bind(this)
        );
    }

    setupEventListeners() {
        $(window).on("edit", (event) => this.handleEdit(event));
        $(window).on("delete", (event) => this.handleDelete(event));
        $(window).on("send", (event) => this.handleSend(event));
    }

    handleEdit(event) {
        this.dataService.postdata(
            "http://localhost:5500/api/bejegyzesek",
            this.display.bind(this),
            this.error.bind(this),
            AdminModel.data($("#input > form").children())
        );
    }

    handleDelete(event) {
        this.parent.empty();
        this.dataService.deleteData(
            "http://localhost:5500/api/bejegyzesek",
            this.display.bind(this),
            this.error.bind(this),
            event.detail
        );
    }

    handleSend(event) {
        this.parent.empty();
        this.dataService.putData(
            "http://localhost:5500/api/bejegyzesek",
            this.display.bind(this),
            this.error.bind(this),
            event.detail
        );
    }

    inputDisplay = (list) => new FormView(list, $("#input"));
    display = (list) => new TableView(list, this.parent);
    error = (error) => new Error(error, this.parent);
}
