struct SlopePattern {
    right: usize,
    down: usize,
}

const PATTERN_PART1: SlopePattern = SlopePattern { right: 3, down: 1 };
const PATTERNS: [SlopePattern; 5] = [
    SlopePattern { right: 1, down: 1 },
    PATTERN_PART1,
    SlopePattern { right: 5, down: 1 },
    SlopePattern { right: 7, down: 1 },
    SlopePattern { right: 1, down: 2 },
];

fn check_is_a_tree(c: Option<char>) -> bool {
    c.unwrap() == '#'
}

fn traverse_a_slope(pattern: &SlopePattern) -> usize {
    include_str!("../../entries/day03.txt")
        .lines()
        .enumerate()
        .step_by(pattern.down)
        .filter(|(i, line)| check_is_a_tree(line.chars().cycle().nth(i * pattern.right)))
        .count()
}

fn main() {
    let trees_for_patterns = PATTERNS.iter().map(|pattern| traverse_a_slope(pattern));
    println!("Part 1 : {}", trees_for_patterns.clone().nth(1).unwrap());
    let p2_trees = trees_for_patterns
        .reduce(|acc, trees_count| acc * trees_count)
        .unwrap();
    println!("Part 2 : {}", p2_trees);
}
