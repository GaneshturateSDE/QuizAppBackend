import { calculateScore } from "../utils/quizUtils.js";

describe("calculateScore()", () => {

    const questions=[
        {_id:"q1", answer:"a1"},
        {_id:"q2", answer:"a2"},
        {_id:"q3", answer:"a3"},
    ]

    test("should return score and total when all answers are correct", () => {
        const answers=[
            {qid:"q1", aid:"a1"},
            {qid:"q2", aid:"a2"},
            {qid:"q3", aid:"a3"},
        ];
        const result=calculateScore(questions,answers);
        expect(result).toEqual({score:3, total:3});
    });

    test("should return score and total when some answers are correct", () => {
        const answers=[
            {qid:"q1", aid:"a1"},
            {qid:"q2", aid:"wrong"},
            {qid:"q3", aid:"a3"},
        ];
        const result=calculateScore(questions,answers);
        expect(result).toEqual({score:2, total:3});
    });

    test("should return score and total when no answers are correct", () => {
        const answers=[
            {qid:"q1", aid:"wrong"},
            {qid:"q2", aid:"wrong"},            
            {qid:"q3", aid:"wrong"},
        ];
        const result=calculateScore(questions,answers);
        expect(result).toEqual({score:0, total:3});
    });

    test("should return score and total when answers array is empty", () => {
        const answers=[];
        const result=calculateScore(questions,answers);
        expect(result).toEqual({score:0, total:3});
    });

    test("should return score and total when questions array is empty", () => {
        const answers=[
            {qid:"q1", aid:"a1"},
            {qid:"q2", aid:"a2"},
            {qid:"q3", aid:"a3"},
        ];
        const result=calculateScore([],answers);
        expect(result).toEqual({score:0, total:0});
    });

 


});