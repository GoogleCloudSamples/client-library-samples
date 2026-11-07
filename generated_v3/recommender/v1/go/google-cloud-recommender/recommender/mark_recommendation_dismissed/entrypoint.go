// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

import (
	"context"
	"log"
	"os"
	"strings"
)

func main() {
	ctx := context.Background()
	w := os.Stdout

	// Support environment variables with optional CLI argument overrides
	projectID := os.Getenv("PROJECT_ID")
	if projectID == "" && len(os.Args) > 1 {
		projectID = os.Args[1]
	}
	projectID = strings.Trim(projectID, "\"'")
	locationID := os.Getenv("LOCATION_ID")
	if locationID == "" && len(os.Args) > 2 {
		locationID = os.Args[2]
	}
	locationID = strings.Trim(locationID, "\"'")
	recommenderID := os.Getenv("RECOMMENDER_ID")
	if recommenderID == "" && len(os.Args) > 3 {
		recommenderID = os.Args[3]
	}
	recommenderID = strings.Trim(recommenderID, "\"'")
	recommendationID := os.Getenv("RECOMMENDATION_ID")
	if recommendationID == "" && len(os.Args) > 4 {
		recommendationID = os.Args[4]
	}
	recommendationID = strings.Trim(recommendationID, "\"'")
	etag := os.Getenv("ETAG")
	if etag == "" && len(os.Args) > 5 {
		etag = os.Args[5]
	}
	etag = strings.Trim(etag, "\"'")

	if err := markRecommendationDismissed(ctx, w, projectID, locationID, recommenderID, recommendationID, etag); err != nil {
		log.Fatalf("markRecommendationDismissed failed: %v", err)
	}
}
