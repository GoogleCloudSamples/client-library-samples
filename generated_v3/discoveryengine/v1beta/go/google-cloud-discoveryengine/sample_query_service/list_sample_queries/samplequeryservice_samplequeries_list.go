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

// [START discoveryengine_v1beta_samplequeryservice_samplequeries_list]

import (
	"context"
	"fmt"
	"io"

	discoveryengine "cloud.google.com/go/discoveryengine/apiv1beta"
	discoveryenginepb "cloud.google.com/go/discoveryengine/apiv1beta/discoveryenginepb"
	"google.golang.org/api/iterator"
	"google.golang.org/api/option"
)

// listSampleQueries lists sample queries in a sample query set.
func listSampleQueries(ctx context.Context, w io.Writer, projectID string, locationID string, sampleQuerySetID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/sampleQuerySets/%s", projectID, locationID, sampleQuerySetID)

	var opts []option.ClientOption
	if locationID != "global" {
		opts = append(opts, option.WithEndpoint(fmt.Sprintf("%s-discoveryengine.googleapis.com:443", locationID)))
	}

	client, err := discoveryengine.NewSampleQueryClient(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewSampleQueryClient failed: %w", err)
	}
	defer client.Close()

	req := &discoveryenginepb.ListSampleQueriesRequest{
		Parent: parent,
	}

	it := client.ListSampleQueries(ctx, req)
	for {
		resp, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next failed: %w", err)
		}
		fmt.Fprintf(w, "Sample query: %s\n", resp.GetName())
	}

	return nil
}

// [END discoveryengine_v1beta_samplequeryservice_samplequeries_list]
