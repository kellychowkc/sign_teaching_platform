import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

    const hasTableUsers = await knex.schema.hasTable("users");
    if (!hasTableUsers) {
        await knex.schema.createTable("users", (table) => {
            table.increments();
            table.string("username").notNullable().unique();
            table.string("password").notNullable();
            table.string("first_name").notNullable();
            table.string("last_name").notNullable();
            table.string("email").notNullable().unique;
            table.integer("phone_num").notNullable().unique;
            table.string("identity").notNullable();
            table.timestamps(true, true);
        });
    };

    const hasTableTeachers = await knex.schema.hasTable("teachers");
    if (!hasTableTeachers) {
        await knex.schema.createTable("teachers", (table) => {
            table.increments();
            table.string("teacher_image").notNullable();
            table.string("teacher_description").notNullable();
            table.integer("user_id").unsigned;
            table.foreign("user_id").references("users.id");
        })
    };

    const hasTableTimeTable = await knex.schema.hasTable("time_table");
    if (!hasTableTimeTable) {
        await knex.schema.createTable("time_table", (table) => {
            table.increments();
            table.string("weekday").notNullable();
            table.string("booking_time").notNullable();
        })
    };

    const hasTableCanBookingTable = await knex.schema.hasTable("can_booking_table");
    if (!hasTableCanBookingTable) {
        await knex.schema.createTable("can_booking_table", (table) => {
            table.increments();
            table.integer("teacher_id").unsigned;
            table.foreign("teacher_id").references("teachers.id");
            table.integer("time_table_id").unsigned;
            table.foreign("time_table_id").references("time_table.id");
        })
    };

    const hasTablePackages = await knex.schema.hasTable("packages");
    if (!hasTablePackages) {
        await knex.schema.createTable("packages", (table) => {
            table.increments();
            table.string("package_name").notNullable();
            table.string("package_description").notNullable();
            table.integer("total_lesson_num").notNullable();
        })
    };

    const hasTablePackagesPrices = await knex.schema.hasTable("packages_prices");
    if (!hasTablePackagesPrices) {
        await knex.schema.createTable("packages_prices", (table) => {
            table.increments();
            table.integer("price").notNullable();
            table.timestamp("activate_time").notNullable();
            table.integer("package_id").unsigned;
            table.foreign("package_id").references("packages.id");
        })
    };

    const hasTableOrders = await knex.schema.hasTable("orders");
    if (!hasTableOrders) {
        await knex.schema.createTable("orders", (table) => {
            table.increments();
            table.integer("total_lesson_num").notNullable();
            table.integer("remaining_lesson_num").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.integer("package_id").unsigned;
            table.foreign("package_id").references("packages.id");
            table.integer("user_id").unsigned;
            table.foreign("user_id").references("users.id");
        })
    };

    const hasTableLessons = await knex.schema.hasTable("lessons");
    if (!hasTableLessons) {
        await knex.schema.createTable("lessons", (table) => {
            table.increments();
            table.timestamp("date_time").notNullable();
            table.string("lesson_link");
            table.string("status").notNullable();
            table.integer("order_id").unsigned;
            table.foreign("order_id").references("orders.id");
            table.integer("teacher_id").unsigned;
            table.foreign("teacher_id").references("teachers.id");
        })
    };

    const hasTableSampleSL = await knex.schema.hasTable("sample_sign_language");
    if (!hasTableSampleSL) {
        await knex.schema.createTable("sample_sign_language", (table) => {
            table.increments();
            table.string("label").notNullable();
            table.string("sample_video").notNullable();
        })
    };

    const hasTableUsersSL = await knex.schema.hasTable("users_sign_language");
    if (!hasTableUsersSL) {
        await knex.schema.createTable("users_sign_language", (table) => {
            table.increments();
            table.string("user_SL_title").notNullable();
            table.string("user_video").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table.integer("best_match_ratio").notNullable();
            table.integer("user_id").unsigned;
            table.foreign("user_id").references("users.id");
            table.integer("sample_SL_id").unsigned;
            table.foreign("sample_SL_id").references("sample_sign_language.id");
        })
    };
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users_sign_language");
    await knex.schema.dropTableIfExists("sample_sign_language");
    await knex.schema.dropTableIfExists("lessons");
    await knex.schema.dropTableIfExists("orders");
    await knex.schema.dropTableIfExists("packages_prices");
    await knex.schema.dropTableIfExists("packages");
    await knex.schema.dropTableIfExists("can_booking_table");
    await knex.schema.dropTableIfExists("time_table");
    await knex.schema.dropTableIfExists("teachers");
    await knex.schema.dropTableIfExists("users");
}

