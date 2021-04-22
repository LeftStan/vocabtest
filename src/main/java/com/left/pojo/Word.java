package com.left.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Word {
    //    id, 单词，翻译，词性
    private String id, word, trans, pov;
}
