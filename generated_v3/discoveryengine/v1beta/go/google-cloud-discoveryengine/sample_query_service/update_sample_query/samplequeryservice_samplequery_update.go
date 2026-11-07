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

// [START discoveryengine_v1beta_samplequeryservice_samplequery_update]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// Use the UpdateSampleQuery method.
func updateSampleQuery(ctx context.Context, w io.Writer, projectID string, locationID string, sampleQuerySetID string, sampleQueryID string) error {
	sampleQuery := &discoveryenginepb.SampleQuery{
		Name: fmt.Sprintf("projects/%s/locations/%s/sampleQuerySets/%s/sampleQueries/%s", projectID, locationID, sampleQuerySetID, sampleQueryID),
		Content: &discoveryenginepb.SampleQuery_QueryEntry_{
			QueryEntry: &discoveryenginepb.SampleQuery_QueryEntry{
				Query: "updated query text",
			},
		},
	}
	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"query_entry"},
	}

	client, err := discoveryengine.NewSampleQueryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSampleQueryClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.UpdateSampleQueryRequest{
		SampleQuery: sampleQuery,
		UpdateMask:  updateMask,
	}

	resp, err := client.UpdateSampleQuery(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateSampleQuery failed: %w", err)
	}

	fmt.Fprintf(w, "Updated sample query: %s\n", resp.GetName())

	return nil
}

// [END discoveryengine_v1beta_samplequeryservice_samplequery_update]
