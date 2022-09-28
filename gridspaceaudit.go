package main

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

type Response struct {
	Persons []Person `json:"results"`
}

type Person struct {
	UserID      string
	DisplayName string
	Email       string
	Status      string
	LastLogin   string
	OrgNode     string
	Name        string
	FirstName   string
	LastName    string
	ExternalID  string
}

func main() {

	urls := [3]string{
		"https://api.gridspace.com/v0/users",
		"https://api.gridspace.com/v0/users?agents_only=true&page=2",
		"https://api.gridspace.com/v0/users?agents_only=true&page=3",
	}

	email_list := make([]Person, 0)

	fmt.Println("Welcome to the Gridspace Email List Compiler!")
	fmt.Println("If you run into any issues, please reach out to Jeff Kleinaitis")
	fmt.Println("-------------------------------------------------------------------------------------------")
	fmt.Println("Enter the Gridspace Account ID: ")
	var accountid string
	fmt.Scanln(&accountid)
	fmt.Println("")
	fmt.Println("Enter the Gridspace Secret Key: ")
	var secretkey string
	fmt.Scanln(&secretkey)
	fmt.Println("-------------------------------------------------------------------------------------------")
	fmt.Println("Thanks for using the compiler. Please check your computer for the file, gridspaceaudit.csv!")

	for _, url := range urls {
		req, _ := http.NewRequest("GET", url, nil)

		req.SetBasicAuth(accountid, secretkey)

		req.Header.Add("Content-Type", "application/json")

		res, _ := http.DefaultClient.Do(req)

		defer res.Body.Close()
		body, _ := ioutil.ReadAll(res.Body)

		var output Response
		json.Unmarshal(body, &output)
		email_list = append(email_list, output.Persons...)
	}
	f, _ := os.Create("gridspaceaudit.csv")
	w := csv.NewWriter(f)
	defer w.Flush()

	for _, p := range email_list {
		row := []string{p.Email}
		w.Write(row)
	}
}
