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

// [START discoveryengine_v1_rankservice_rank]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1/discoveryenginepb"
)

// rank re-ranks records based on a query.
func rank(ctx context.Context, w io.Writer, projectNumID string, locationID string) error {
	rankingConfig := fmt.Sprintf("projects/%s/locations/%s/rankingConfigs/default_ranking_config", projectNumID, locationID)
	records := []*discoveryenginepb.RankingRecord{
		{
			Id:      "1",
			Title:   "Effective Go",
			Content: "Tips for writing clear, idiomatic Go code.",
		},
		{
			Id:      "2",
			Title:   "Google Cloud Discovery Engine",
			Content: "Rank service provides document re-ranking based on search queries.",
		},
	}

	client, err := discoveryengine.NewRankClient(ctx)
	if err != nil {
		return fmt.Errorf("NewRankClient: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.RankRequest{
		RankingConfig: rankingConfig,
		Model:         "semantic-ranker-512@latest",
		Query:         "clear idiomatic Go",
		Records:       records,
	}

	resp, err := client.Rank(ctx, req)
	if err != nil {
		return fmt.Errorf("Rank: %w", err)
	}

	for _, record := range resp.GetRecords() {
		fmt.Fprintf(w, "Record ID: %s, Score: %f\n", record.GetId(), record.GetScore())
	}

	return nil
}

// [END discoveryengine_v1_rankservice_rank]
