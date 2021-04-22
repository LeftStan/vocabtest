package com.left.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.Map;

@Controller
public class JDBCController {

    @Autowired
    JdbcTemplate jdbcTemplate;

    @PostMapping("/vocab")
    @ResponseBody
    public List<Map<String, Object>> book(HttpServletResponse response, @RequestParam("bookType") String book, Model model){
        String num = "30";
        //根据选择词库决定测试单词量
        switch(book) {
            case "pri": num="20"; break;
            case "middle": num="40"; break;
            case "high": num="80"; break;
            case "cet4": num="100"; break;
            case "cet6": num="130"; break;
            case "kaoyan": num="140"; break;
            case "toefl": num="150"; break;
            case "gre": num="260"; break;
        }
        //从数据库获取数据
        String sql = "select * from " + book + " order by rand() limit " + num;
        List<Map<String, Object>> list_maps = jdbcTemplate.queryForList(sql);
//        model.addAttribute("words", list_maps);
//        model.addAttribute("bookType", book);
        //返回数据给前端
        return list_maps;

    }


    @PostMapping("/question")
    @ResponseBody
    public List<Map<String, Object>> editSave(HttpServletResponse response, @RequestParam("check") String words, @RequestParam("bookType") String book, Model model){
        String [] check_words = words.split(",");
        List<Map<String, Object>> list_maps, temp, ques_maps;
        list_maps = null;
//        System.out.println(book);
        //根据勾选单词出题
        for(String i: check_words){
            String sql = "";
//            String sql = "select word from " + book + " where id = "+i;
//            temp = jdbcTemplate.queryForList(sql);
//            if(list_maps == null)
//                list_maps = temp;
//            else
//                list_maps.add(temp.get(0));

//            sql = "select trans from " + book + " where id = "+i;
//            temp = jdbcTemplate.queryForList(sql);
//            list_maps.add(temp.get(0));

            sql = "select trans from " + book + " where id != " + i + " order by rand() limit 3";
            temp = jdbcTemplate.queryForList(sql);
            if(list_maps == null)
                list_maps = temp;
            else{
                list_maps.add(temp.get(0));
                list_maps.add(temp.get(1));
                list_maps.add(temp.get(2));
            }
        }

//        System.out.println(list_maps.toString());

//        model.addAttribute("ques_word", ques_maps);
//        System.out.println(ques_maps.toString());
        //返回数据给前端
        return list_maps;


    }

}
