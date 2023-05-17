use json::JsonValue;
use regex::Regex;
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

fn extract_info_from_json_line(line: &str) -> (usize, usize, char, &str) {
    let re = Regex::new(r"^(?<min>\d+)-(?<max>\d+)\s(?<letter>[[:alpha:]]):\s(?<pswd>[[:alpha:]]+)")
        .unwrap();
    let cap = re.captures(line).unwrap();
    let min: usize = cap.name("min").unwrap().as_str().parse().unwrap();
    let max: usize = cap.name("max").unwrap().as_str().parse().unwrap();
    let letter: char = cap.name("letter").unwrap().as_str().parse().unwrap();
    let password = cap.name("pswd").unwrap().as_str();
    (min, max, letter, password)
}

fn count_occurences_of_letter(letter: char, line: &str) -> usize {
    line.matches(letter).count()
}

fn find_positions_of_letter(letter: char, line: &str) -> Vec<(usize, &str)> {
    line.match_indices(letter).collect()
}

fn check_password_valid_part1(line: &str) -> bool {
    let (min, max, letter, password) = extract_info_from_json_line(line);
    let occ = count_occurences_of_letter(letter, password);
    min <= occ && occ <= max
}

fn check_password_valid_part2(line: &str) -> bool {
    let (min, max, letter, password) = extract_info_from_json_line(line);
    let positions = find_positions_of_letter(letter, password);
    let mut found = false;
    for (idx, _) in positions {
        let matches_password_policy = min == idx + 1 || max == idx + 1;
        if found && matches_password_policy {
            return false;
        } else if !found && matches_password_policy {
            found = true
        }
    }
    return found;
}

fn main() {
    let json = read_json_from_file("../entries/day02.json");
    let count_part1 = json
        .members()
        .map(|x| x.as_str().unwrap())
        .filter(|x| check_password_valid_part1(&x))
        .count();
    println!("{}", count_part1);
    let count_part2 = json
        .members()
        .map(|x| x.as_str().unwrap())
        .filter(|x| check_password_valid_part2(&x))
        .count();
    println!("{}", count_part2);
}
