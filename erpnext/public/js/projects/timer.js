frappe.provide("erpnext.timesheet");

erpnext.timesheet.timer = function(frm, row, timestamp=0) {
	let dialog = new frappe.ui.Dialog({
		title: __("Time Entry"),
		fields: [
			{
				"fieldtype": "Time",
				"label": __("Time"),
				"fieldname": "time",
				"reqd": 1
			},
			{
				"fieldtype": "Link",
				"label": __("Activity Type"),
				"fieldname": "activity_type",
				"reqd": 1,
				"options": "Activity Type"
			},
			{
				"fieldtype": "Link",
				"label": __("Project"),
				"fieldname": "project",
				"options": "Project"
			},
			{
				"fieldtype": "Link",
				"label": __("Task"),
				"fieldname": "task",
				"options": "Task"
			},
			{
				"fieldtype": "Float",
				"label": __("Expected Hrs"),
				"fieldname": "expected_hours"
			}
		]
	});

	if (row) {
		dialog.set_values({
			"time": row.time,
			"activity_type": row.activity_type,
			"project": row.project,
			"task": row.task,
			"expected_hours": row.expected_hours
		});
	}

	erpnext.timesheet.save_entry = function() {
		var args = dialog.get_values();
		if (!args) return;

		if (row) {
			row.time = args.time;
			row.activity_type = args.activity_type;
			row.project = args.project;
			row.task = args.task;
			row.expected_hours = args.expected_hours;
			frm.refresh_field("time_logs");
		} else {
			row = frappe.model.add_child(frm.doc, "Timesheet Detail", "time_logs");
			row.time = args.time;
			row.activity_type = args.activity_type;
			row.project = args.project;
			row.task = args.task;
			row.expected_hours = args.expected_hours;
		}

		frm.dirty();
		frm.save();
		dialog.hide();
	};

	dialog.set_primary_action(__("Save"), erpnext.timesheet.save_entry);
	dialog.show();
};

