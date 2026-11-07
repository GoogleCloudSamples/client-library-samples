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

// [START discoveryengine_v1beta_samplequeryservice_import_sample_queries]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
)

// importSampleQueries imports sample queries into a sample query set.
func importSampleQueries(ctx context.Context, w io.Writer, projectID string, locationID string, sampleQuerySetID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/sampleQuerySets/%s", projectID, locationID, sampleQuerySetID)

	client, err := discoveryengine.NewSampleQueryClient(ctx)
	if err != nil {
		return fmt.Errorf("NewSampleQueryClient failed: %w", err)
	}
	defer client.Close()

	sampleQuery := &discoveryenginepb.SampleQuery{
		Content: &discoveryenginepb.SampleQuery_QueryEntry_{
			QueryEntry: &discoveryenginepb.SampleQuery_QueryEntry{
				Query: "example search query",
			},
		},
	}

	inlineSource := &discoveryenginepb.ImportSampleQueriesRequest_InlineSource{
		SampleQueries: []*discoveryenginepb.SampleQuery{sampleQuery},
	}

	req := &discoveryenginepb.ImportSampleQueriesRequest{
		Parent: parent,
		Source: &discoveryenginepb.ImportSampleQueriesRequest_InlineSource_{
			InlineSource: inlineSource,
		},
	}

	op, err := client.ImportSampleQueries(ctx, req)
	if err != nil {
		return fmt.Errorf("ImportSampleQueries failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Imported sample queries response: %v\n", resp)
	return nil
}

// [END discoveryengine_v1beta_samplequeryservice_import_sample_queries]
