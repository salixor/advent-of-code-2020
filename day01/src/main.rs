use json::JsonValue;
use std::{error::Error, fs};

fn read_file_string(path: &str) -> Result<String, Box<dyn Error>> {
    let data = fs::read_to_string(path)?;
    Ok(data)
}

fn read_json_from_file(path: &str) -> JsonValue {
    let file_content = read_file_string(path).unwrap();
    let parsed = json::parse(&file_content).unwrap();
    return parsed;
}

fn get_value_to_expected(v1: usize, v2: usize, target: usize, expected: usize) -> Option<usize> {
    let sub = target.checked_sub(v1 + v2);
    if sub.is_some() && sub.unwrap() == expected {
        return sub;
    }
    return None;
}

fn find_values_which_make_expected_sum(json: &JsonValue, target: usize) -> Option<(usize, usize)> {
    for val1 in json.members().map(|x| x.as_usize().unwrap()) {
        for val2 in json.members().map(|x| x.as_usize().unwrap()) {
            let val3 = get_value_to_expected(val1, val2, target, 0);
            if val3.is_some() {
                return Some((val1, val2));
            }
        }
    }

    None
}

fn find_values_which_make_expected_sum_part2(
    json: &JsonValue,
    target: usize,
) -> Option<(usize, usize, usize)> {
    for val1 in json.members().map(|x| x.as_usize().unwrap()) {
        for val2 in json.members().map(|x| x.as_usize().unwrap()) {
            let mut values_iter = json.members();
            let val3 = values_iter
                .find_map(|x| get_value_to_expected(val1, val2, target, x.as_usize().unwrap()));
            if val3.is_some() {
                return Some((val1, val2, val3.unwrap()));
            }
        }
    }

    None
}

fn find_product_for_sum(json: &JsonValue, target: usize) -> usize {
    let (v1, v2) = find_values_which_make_expected_sum(json, target).unwrap();
    v1 * v2
}

fn find_product_for_sum_part2(json: &JsonValue, target: usize) -> usize {
    let (v1, v2, v3) = find_values_which_make_expected_sum_part2(json, target).unwrap();
    v1 * v2 * v3
}

fn main() {
    let json = read_json_from_file("../entries/day01.json");
    let prod_part1 = find_product_for_sum(&json, 2020);
    println!("{}", prod_part1);
    let prod_part2 = find_product_for_sum_part2(&json, 2020);
    println!("{}", prod_part2);
}
